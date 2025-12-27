import express from "express";
import { getUsers } from "../services/user.service.js";

const router = express.Router();

router.get("/", getUsers);

export default router;
