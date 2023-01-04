import { Router } from "express";
import { ProductsController } from "../Controllers/ProductsController/ProductsController";
import { checkJwt } from "../middleware/decodeAuthJwt";

const productsRouter = Router();
const productsController = new ProductsController();

//! Products
productsRouter.get("/products", checkJwt, productsController.index);
productsRouter.get("/products/:id", checkJwt, productsController.show);
productsRouter.post("/products", checkJwt, productsController.create);
productsRouter.put("/products/:id", checkJwt, productsController.update);
productsRouter.delete("/products/:id", checkJwt, productsController.delete);

export { productsRouter };
