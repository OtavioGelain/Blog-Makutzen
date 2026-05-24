import { Queue } from "bullmq";
import { connection } from "./connection";

export const mailQueue = new Queue("mail-queue", {
    connection
})