import { Request, Response } from "express";
import connection from "../../../database/connection";

class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const products = await connection("products").select("*");
      return response.status(200).json(products);
    } catch (error) {
      return response
        .status(404)
        .json({ message: "Erro ao gerar lista de produtos" });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, price, description, uri } = request.body;
      const product = {
        name,
        price,
        description,
        uri
      };
      await connection("products").insert(product);
      return response.status(201).json(product);
    } catch (error) {
      return response
        .status(401)
        .json({ error: "Produto com mesmo nome ja registrado" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
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
      return response
        .status(400)
        .json({ message: "Erro ao atualizar os campos do produto" });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const product = await connection("products").where("id", id).first();
      return response.status(201).json(product);
    } catch (error) {
      return response.status(404).json({ message: "Erro ao exibir produto" });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await connection("products").where("id", id).delete();
      return response.status(204).send();
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao deletar produto selecionado" });
    }
  }
}

export { ProductsController };
