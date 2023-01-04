import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const data = require("../config/auth.json");

export function checkJwt(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, data.secret);
    console.log(decoded);
    return next();
  } catch {
    return response.status(401).json({ error: "Token invalid" });
  }
}
