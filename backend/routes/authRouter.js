import { Router } from "express";
import { getlogin, postlogin } from "../controllers/authController.js";

const auth = Router();

auth.get("/login", getlogin);
auth.post("/login", postlogin);

export default auth;
