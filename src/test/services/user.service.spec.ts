import { userRepository, UserService } from "../../services/user.service";
import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals"
import { makeUser } from "../factories/userFactory"
import { AppDataSource } from "../../database/DataSource";
import { User } from "../../entities/User";



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
    it("Should show users", async () => {
        const fakeUser: Partial<User>[] = [{
            username: "otaviogelain",
            name: "otavio",
            password: "otavio03",
            email: "otavio@gmail.com"
        }]
        
        jest.spyOn(userRepository, "find")
        .mockResolvedValue(fakeUser as User[])

        const result = await UserService.showUser()

        expect(result).toEqual(fakeUser)
    })
  
})