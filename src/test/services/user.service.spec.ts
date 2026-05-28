import { userRepository, UserService } from "../../services/user.service";
import { describe , expect, it } from "@jest/globals"
import { makeUser } from "../factories/userFactory"

describe("UserService",  () => {
    it("should create user", async () => {
        const fakeUser = makeUser()
        UserService.createUser(fakeUser)
        const databaseUser =  await userRepository.findOneBy({
            email: fakeUser.email
        })
        expect(databaseUser).toBeDefined()
        
    })
})