import { Router } from "express";
import { userRouter } from "./user.routes";
import { productsRouter } from "./products.routes";
import { userProductsRouter } from "./userProducts.routes";
import { AuthUser } from "../Controllers/UserSessionController/SessionController";
import { checkJwt } from "../middleware/decodeAuthJwt";

const authUser = new AuthUser();

const router = Router();

router.use( userRouter);

router.post("/session", authUser.signIn);
router.use(checkJwt, productsRouter);
router.use(checkJwt, userProductsRouter);

export { router };
