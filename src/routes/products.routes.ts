import { Router } from "express";
import { ProductsController } from "../Controllers/ProductsController/ProductsController";

const productsRouter = Router();
const productsController = new ProductsController();

//! Products
productsRouter.get("/products", productsController.index);
productsRouter.get("/products/:id", productsController.show);
productsRouter.post("/products", productsController.create);
productsRouter.put("/products/:id", productsController.update);
productsRouter.delete("/products/:id", productsController.delete);

export { productsRouter };
