import { Worker } from "bullmq";
import { connection } from "../queue/connection";
import { transporter } from "../utils/transport";

console.log("Worker de email iniciado...");

new Worker(
  "mail-queue",
  async (job) => {
    console.log("job recebido", job.name,job.data);
    const { type, data } = job.data;

    if (type === "welcome") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Bem-vindo!",
        html: `<p>Olá, ${data.name}!</p>`,
      });
    }

    if (type === "notification") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.emails,
        subject: "Notificação",
        html: `<p>${data.message}</p>`,
      });
    }

    if (type === "single") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Aviso!!",
        html: `<p>${data.message}</p>`,
      });
      console.log("Email enviado para", data.email);
    }
  },
  { connection }
);