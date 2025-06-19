import { cookies } from "next/headers";
import { signJwt, verifyJwt } from "./jwt";

export async function updateLoginCookie(){
    try {
        const cookieStorage = await cookies();
        const token = cookieStorage.get("token")?.value;

        if (!token) {
            throw new Error("No cookie found");
        }

        const decodedToken = verifyJwt(token);
        if (!decodedToken) {
            throw new Error("Invalid Token")
        }

        const newToken = signJwt({
            id: decodedToken.id,
            email: decodedToken.email,
        }, 60 * 60 * 24 * 30);
        
        cookieStorage.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30
        });
        
    } catch (err) {
        throw new Error("Could not gather cookies");
    }
}