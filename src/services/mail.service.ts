import { userRepository } from "./user.service";
import { User } from "../entities/User";
import { mailQueue } from "../queue/mail.queue";

const user = userRepository

export class MailService {
  static async sendWelcomeEmail(user: User) {
    await mailQueue.add("welcome-email", {
      type: "welcome",
      data: {
        email: user.email,
        name: user.name,
      },
    });
  }

  static async sendNotificationForAll(message: string) {
    const users = await userRepository.find();

    await mailQueue.add("notify-all", {
      type: "notification",
      data: {
        emails: users.map((u) => u.email),
        message,
      },
    });
  }

  static async sendEmailForOnePerson(email: string, message: string) {
    await mailQueue.add("single-email", {
      type: "single",
      data: {
        email,
        message,
      },
    });
  }
}