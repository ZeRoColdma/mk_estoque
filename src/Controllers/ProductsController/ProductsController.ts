import { Request, Response } from "express";
import { v4 } from "uuid";
import connection from "../../database/connection";

class ProductsController {
  async index(request: Request, response: Response) {
    try {
      const products = await connection("products").select("*");
      return response.status(200).json(products);
    } catch (error) {
      return response.status(404).json({ message: "error" });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { name, price, description } = request.body;

      const productExists = await connection("products")
        .select("*")
        .where("name", name)
        .first();

      if (productExists) {
        return response.status(400).json({ message: "product already exists" });
      }

      const product = {
        id: v4(),
        name,
        price,
        description,
      };
      await connection("products").insert(product);
      return response.status(201).json(product);
    } catch (error) {
      console.log(error);
      return response.status(401).json(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, price, description } = request.body;
      const product = {
        name,
        price,
        description,
      };
      await connection("products").where("id", id).update(product);
      return response.status(204).json(product);
    } catch (error) {
      return response.status(400).json({ message: "error" });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const product = await connection("products").where("id", id).first();
      return response.status(201).json(product);
    } catch (error) {
      return response.status(404).json({ message: "error" });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await connection("products").where("id", id).delete();
      return response.status(204).send();
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "error" });
    }
  }
}

export { ProductsController };
