import { Router } from "express";
import { UserProductsController } from "../Controllers/UserProducts/UserProductsController";
import { checkJwt } from "../middleware/decodeAuthJwt";
const userProductsRouter = Router();

const userProductsController = new UserProductsController();

//! New User Products
userProductsRouter.get(
  "/user_products/:id",
  checkJwt,
  userProductsController.index,
);
userProductsRouter.get(
  "/user_products/:id",
  checkJwt,
  userProductsController.show,
);

userProductsRouter.post(
  "/user_products/products",
  checkJwt,
  userProductsController.create,
);
userProductsRouter.put(
  "/user_products",
  checkJwt,
  userProductsController.update,
);
userProductsRouter.delete(
  "/user_products",
  checkJwt,
  userProductsController.delete,
);

export { userProductsRouter };
