import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { authHandler } from "../middlewares/authHandler";

export const userRouter = Router()

userRouter.get("/search/username", authHandler, UserController.showUserByUsername)
userRouter.post("/auth/register", UserController.createUser)


userRouter.get("/search/name", authHandler, UserController.showUserByName)
userRouter.post("/auth/login", UserController.login)

userRouter.get("/", authHandler, UserController.showUsers)
userRouter.get("/:id", authHandler, UserController.showUserById)
userRouter.put("/:id", authHandler, UserController.updateUser)
userRouter.delete("/:id", authHandler, UserController.deleteUser)