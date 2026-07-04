import { userRepository, UserService } from "../../services/user.service";
import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from "@jest/globals"
import * as hashUtils from "../../utils/encryptHash"


describe("UserService",  () => {
    let userService

    
    userService = new UserService()
    it("Deve criar um usuario", async () => {
        let fakeUser = {
            username: "otavio",
            name: "otavio",
            password: "otavio123",
            email: "teste@gmail.com"
        }
        jest.spyOn(hashUtils, "hashedpassword").mockResolvedValue("hashedPassword")
        jest.spyOn(userRepository, "create").mockImplementation(
            (data) => data as any
        )
        jest.spyOn(userRepository, "save").mockResolvedValue({} as any)

        const user = await UserService.createUser(fakeUser)
        
        expect(user.name).toBe("otavio")
        expect(user.password).toBe("hashedPassword")
        expect(userRepository.save).toHaveBeenCalled()
    })

})