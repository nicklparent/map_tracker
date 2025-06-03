import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types";

const SECRET_KEY = process.env.SECRET_KEY! as string;

export function signJwt(payload: object, expiresIn: string | number = "1d"): string {
    try {
        
        return jwt.sign(payload, SECRET_KEY, { 
            expiresIn: expiresIn as jwt.SignOptions['expiresIn']
        });
    } catch (error) {
        throw new Error("Failed to sign JWT token");
    }
}

export function verifyJwt(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch (error) {
        console.error("JWT verification error:", error);
        return null;
    }
}