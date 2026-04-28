import nodemailer from "nodemailer";
import "dotenv/config";
import { userRepository } from "../services/user.service";

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
    to: "maierboscoalisson@gmail.com",
    subject: "Aprovação!!",
    html: "<p>Olá, Alisson!<br><br>Tudo bem?<br><br>Me chamo Gabriel e falo em nome da <strong>Makutzen</strong>. Estamos atualmente em busca de um <strong>estagiário na área de Engenharia de Software</strong>, e seu perfil chamou nossa atenção.<br><br>Sabemos que você está no início da sua jornada na área, e queremos deixar claro que valorizamos muito pessoas com vontade de aprender, curiosidade e dedicação — pontos que consideramos essenciais para crescer junto com a empresa.<br><br>A oportunidade envolve aprendizado prático no desenvolvimento de software, contato com boas práticas do mercado e acompanhamento próximo do time técnico, para que você evolua de forma consistente.<br><br>Gostaríamos de saber se você tem interesse em conversar mais sobre essa oportunidade. Se fizer sentido para você, podemos agendar um bate-papo rápido para nos conhecermos melhor.<br><br>Fico no aguardo do seu retorno!<br><br>Abraços,<br>Gabriel<br><strong>Makutzen</strong></p>",
    //text: "Teste"
})

.then((response) => console.log("Email enviado com sucesso", response))
.catch((error) => console.log("Erro ao enviar o email", error))