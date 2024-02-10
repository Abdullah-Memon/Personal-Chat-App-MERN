import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    reciverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    message: {
        type: String,
        required: true,
    },
},{
    // This will add createdAt and updatedAt fields to the schema
    // message.createdAt = 09/02/2024 (example)
    timestamps:true,
});

const Message = mongoose.model("Message",messageSchema);

export default Message;