import express from "express";
import isAthorize from "../middleware/isAthorize.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",isAthorize,getUsers);

export default router;