import { Request, Response } from "express";
import { v4 } from "uuid";
import { retriveUserId } from "../../middleware/decodeAuthJwt";
import connection from "../../../database/connection";

class UserProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_products = await connection("user_products")
        .select("*")
        .where("user_id", request.params.user_id);
      return response.status(200).json(user_products);
    } catch {
      return response.status(403).json({ message: "error" });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { quantity } = request.body;
      const { product_id, user_product_id } = request.query;

      const user_id = retriveUserId(request.headers.authorization);

      const user_product = {
        user_product_id,
        user_id: user_id,
        product_id,
        quantity,
      };

      const user_productExists = await connection("user_products")
        .select("*")
        .where("user_id", user_id)
        .andWhere("product_id", product_id);

      if (user_productExists.length > 0) {
        return response
          .status(400)
          .json({ message: "Produto já existe no seu estoque" });
      } else {
        await connection("user_products").insert(user_product);
        return response.status(201).json(user_product);
      }
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { user_product_id } = request.query;

    try {
      const user_products = await connection("user_products")
        .select("*")
        .where("user_product_id", user_product_id);
      return response.json(user_products);
    } catch (error) {
      return response.status(404).json({ message: "error" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, user_product_id } = request.query;
      const { quantity } = request.body;
      const user_product = {
        quantity,
      };
      await connection("user_products")
        .where("user_id", user_id)
        .andWhere("user_product_id", user_product_id)
        .update(user_product);
      return response.status(204).json(user_product);
    } catch {
      return response.status(400).json({ message: "error" });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { user_product_id } = request.query;
      await connection("user_products")
        .where("user_product_id", user_product_id)
        .delete();
      return response.status(204).send();
    } catch (error) {
      return response.status(403).json({ message: "error" });
    }
  }
}

export { UserProductsController };
