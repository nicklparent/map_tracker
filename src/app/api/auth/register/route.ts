import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {email, password} = await req.json();
    
    try {
        const existingUser = prisma.user.findUnique({
            where: { email }
        });

        
    } catch (err) {
        return NextResponse.json({error: err}, {status: 401});
    }
}