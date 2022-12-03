import { Router } from "express";
import { userRouter } from "./user.routes";
import { productsRouter } from "./products.routes";
import { userProductsRouter } from "./userProducts.routes";
import { AuthUser } from "../Controllers/UserSessionController/SessionController";

const router = Router();

const authUser = new AuthUser();

router.use(userRouter);

router.post("/session", authUser.signIn);

router.use(productsRouter);
router.use(userProductsRouter);

export { router };
