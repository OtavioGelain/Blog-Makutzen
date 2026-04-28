import { Router } from "express";
import { MailController } from "../controllers/mail.controller";
import { authHandler } from "../middlewares/authHandler";

export const mailRouter = Router()

mailRouter.post("/", authHandler,MailController.sendMailForAll)