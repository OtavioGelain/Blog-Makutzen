import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export function authHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const secretKey = process.env.JWT_KEY;

        if (!secretKey) {
            throw new Error("JWT_KEY not defined");
        }

        const decoded = jwt.verify(token, secretKey) as { id: number };

        (req as any).user = decoded;

        next(); 

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}