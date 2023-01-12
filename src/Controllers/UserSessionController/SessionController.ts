import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
const data = require("../../config/auth.json");

import connection from "../../database/connection";

class AuthUser {
  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: "Missing email or password" });
    }

    const user = await connection("users").where("email", email).first();

    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return response.status(400).json({ error: "Incorrect password" });
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      data.secret,
      {
        subject: user.name,
        expiresIn: "1d",
      },
    );

    await connection("users")
      .where("email", email)
      .update({ user_session_token: token });

    return response.json({ token });
  }
}

export { AuthUser };
