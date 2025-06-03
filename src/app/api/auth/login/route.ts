import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { JwtPayload } from "@/types";

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

        // Return succesful login without password on user and a jwt token
        return NextResponse.json({ 
            user: userWithoutPassword,
            token: token,
        }, { status: 200 });
    } catch (e) {
        return NextResponse.json({error: "User Credentials invalid."}, { status: 401 });
    }
}