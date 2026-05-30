import { faker } from "@faker-js/faker"
import { User } from "../../entities/User"

export function makeUser(): Partial<User>  {
    return {
        username: faker.person.firstName(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    }
}