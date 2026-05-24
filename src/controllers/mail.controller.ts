import { Response, Request} from 'express'
import { MailService } from '../services/mail.service'
import { userRepository } from '../services/user.service'

export class MailController{
    static async sendMailForAll(req: Request, res: Response): Promise<Response>{
        try{
            const { message } = req.body
            await MailService.sendNotificationForAll(message)
            return res.status(200).json({ message: "Emails enviados com sucesso!" })
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async sendEmailForOnePerson(req: Request, res: Response): Promise<Response>{
        try{
            const { email, message } = req.body
            const user = await userRepository.findOneBy({ email })
            if(!user){
                return res.status(404).json({message: "Email not found"})
            }
            await MailService.sendEmailForOnePerson(email, message)
            return res.status(200).json({message: "Email enviado com sucesso"})
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
}