import { Request, Response } from "express";
import connection from "../../database/connection";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { User } from "../../interfaces/UserInterfaces/index";

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const users = await connection("users").select("*");
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ error: "Error loading users" });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const user = await connection("users").where("email", email).first();
      if (user) {
        return response.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await connection("users").insert({
        id: v4(),
        name,
        email,
        password: hashedPassword,
      });

      return response.status(201).json({ name, email });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: "Error creating new user" });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const user = await connection("users").where("id", id).first();
      if (!user) {
        return response.status(400).json({ error: "User not found" });
      }
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: "Error loading user" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, email, password } = request.body;
      const user = await connection("users").where("id", id).first();

      if (!user) {
        return response.status(400).json({ error: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await connection("users").where("id", id).update({
        name,
        email,
        password: hashedPassword,
      });

      return response.status(201).json({ name, email });
    } catch (error) {
      return response.status(400).json({ error: "Error updating user" });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const user = await connection("users").where("id", id).first();
      if (!user) {
        return response.status(400).json({ error: "User not found" });
      }
      await connection("users").where("id", id).delete();
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error });
    }
  }
}

export { UserController };
