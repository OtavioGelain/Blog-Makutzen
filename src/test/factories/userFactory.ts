import { faker } from "@faker-js/faker"

export function makeUser()  {
    return {
        id: faker.number.int(),
        username: faker.person.firstName(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    }
}