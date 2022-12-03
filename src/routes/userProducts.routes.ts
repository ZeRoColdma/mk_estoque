import { Router } from "express";
import { UserProductsController } from "../Controllers/UserProducts/NewUserProductsController";
const userProductsRouter = Router();

const userProductsController = new UserProductsController();

//! New User Products
userProductsRouter.get("/user_products/:id", userProductsController.index);
userProductsRouter.get("/user_products/:id", userProductsController.show);

userProductsRouter.post(
  "/user_products/products",
  userProductsController.create,
);
userProductsRouter.put("/user_products", userProductsController.update);
userProductsRouter.delete("/user_products", userProductsController.delete);

export { userProductsRouter };
