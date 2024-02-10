import express from "express";
import { sendMsg, getMsg } from "../controllers/msg.controller.js";
import isAthorize from "../middleware/isAthorize.js";


const route = express.Router();

// isAthorize is used to check the user is logged in or not
route.post("/send/:id", isAthorize ,sendMsg);

route.get("/:id", isAthorize ,getMsg);

export default route;