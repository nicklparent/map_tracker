import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
    const {email, password} = await req.json();

    try {
        const user = prisma.User.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Email Address"}, { status: 401 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Invalid Password"}, { status: 401 });
        }
        

        const { password: _, ...userWithoutPassword} = user;
        // Return succesful login without password on user
        return NextResponse.json({ user: userWithoutPassword}, { status: 200 });
    } catch (e) {
        return NextResponse.json({error: "User Credentials invalid."}, { status: 401 });
    }
}