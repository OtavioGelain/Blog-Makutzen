import { userRepository, UserService } from "../../services/user.service";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals"
import { makeUser } from "../factories/userFactory"
import { AppDataSource } from "../../database/DataSource";

describe("UserService",  () => {
    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    it("should create user", async () => {
        const fakeUser = makeUser()
        await UserService.createUser(fakeUser)
        const databaseUser =  await userRepository.findOneBy({
            email: fakeUser.email
        })
        expect(databaseUser).toBeDefined()  
    })
})