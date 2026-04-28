import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "otavioluizgelain@gmail.com",
    subject: "Email teste",
    html: "<h1>Teste</h1>",
    text: "Teste"
})

.then((response) => console.log("Email enviado com sucesso", response))
.catch((error) => console.log("Erro ao enviar o email", error))