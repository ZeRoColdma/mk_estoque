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
    const { exp } = decoded as any;
    const now = Math.floor(Date.now() / 1000);

    if (now > exp) {
      return response.status(401).json({ error: "Token expired" });
    }
    
    return next();
  } catch {
    return response.status(401).json({ error: "Token invalid" });
  }
}

export function retriveUserId(tokenJwt: any) {
  const authHeader = tokenJwt;
  const [, token] = authHeader.split(" ");
  const decoded = jwt.verify(token, data.secret);
  const { id } = decoded as any;
  return id;
}
