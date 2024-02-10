import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMsg = async (req, res) => {
  try {
    const { id: reciever_id } = req.params;
    const sender_id = req.user._id;
    const { msg } = req.body;

    // check if the conversation already exists
    let conversation = await Conversation.findOne({
      members: { $all: [sender_id, reciever_id] },
    });

    // if conversation does not exists then create a new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        members: [sender_id, reciever_id],
      });
    }

    // add the text into message collection
    const new_Msg = new Message({
      senderID: sender_id,
      reciverID: reciever_id,
      message: msg,
    });

    // if message is sent successfully then add the message id into conversation
    if (new_Msg) {
      conversation.chat.push(new_Msg._id);

      // this will run in parallel and will save the data in database instead of waiting for one to complete and then save the other
      await Promise.all([new_Msg.save(), conversation.save()]);

      res.status(201).json({ message: "Message Sent", data: new_Msg.message });
    } else {
      res.status(400).json({ message: "Failed to send message" });
    }

    // Socket functionality
  } catch (error) {
    // 500 is used for "Internal Server Error"
    res.status(500).json({ message: error.message });
    console.log("Internal Server Error", error);
  }
};

export const getMsg = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // .populate("chat") will populate the chat field in conversation with the data from message collection
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, userToChatId] },
    }).populate("chat");

    if (conversation) {
      res.status(200).json({ message: "Messages Fetched", data: conversation.chat });
    } else {
      res.status(404).json({ message: "Conversation not found" });
    }


  } catch (error) {
    console.log("Error in getMsg Controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
