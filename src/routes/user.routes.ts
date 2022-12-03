import { Router } from "express";
import { UserController } from "../Controllers/UserController/UserController";
const userRouter = Router();

const userController = new UserController();

userRouter.get("/user", userController.index);
userRouter.get("/user/:id", userController.show);
userRouter.post("/user", userController.create);
userRouter.delete("/user/:id", userController.delete);

export { userRouter };
