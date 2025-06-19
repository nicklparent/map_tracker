import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { JwtPayload } from "@/types";

export async function GET(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token){
            return NextResponse.json({error: "token not found"}, {status: 401})
        }

        const decodedToken = verifyJwt(token);

        const user = await prisma.User.findUnique({
            where: {id: decodedToken?.id},
            select: {
                id: true,
                email: true,
            }
        })
    } catch(err){
        return NextResponse.json({error: "Authentication Failed"}, {status: 401});
    }
}


export async function POST(req: NextRequest){
    const {email, password} = await req.json();

    try {
        const user = await prisma.User.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Email Address"}, { status: 401 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Incorrect Password"}, { status: 401 });
        }
        
        
        const { password: _, ...userWithoutPassword} = user;

        //create a 30 day session after succesful login
        const token = signJwt({
            id: userWithoutPassword.id, 
            email: userWithoutPassword.email
        }, "30d");



        const response = NextResponse.json({ 
            user: userWithoutPassword,
            token: token,
        }, { status: 200 });
        
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, //1 Month
        });


        // Return succesful login without password on user and a jwt token
        return response;
    } catch (e) {
        return NextResponse.json({error: "User Credentials invalid."}, { status: 401 });
    }
}