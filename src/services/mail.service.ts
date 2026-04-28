import { transporter } from "../utils/transport";
import { userRepository } from "./user.service";
import { User } from "../entities/User";

const user = userRepository

export class MailService{
    static async sendWelcomeEmail(user: User){
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Bem-vindo!",
            html: `<p>Olá, ${user.name}!</p><p>Bem-vindo à nossa plataforma!</p>`
        })
        .then((response) => console.log("Email enviado com sucesso", response))
        .catch((error) => console.log("Erro ao enviar o email", error))
    }
    static async sendNotificationForAll(message: string){
        const users = await userRepository.find()
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: users.map((u) => u.email),
            subject: "Notificação",
            html: `<p>${message}</p>`
        })
    }
    static async sendEmailForOnePerson(email: string, message: string){
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Aviso!!",
            html: `<p>${message}</p>`
        })
    }
}