import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma';
import { NextRequest } from "next/server";
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log(data, 'soydataenel server');
       
        if (!data || !data.email || !data.password || !data.name) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        try {
            const existUser = await prisma.user.findUnique({
                where: { email: data.email}
            })
            if(existUser){
                return NextResponse.json({message: 'User already exist'}, { status: 400 })
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = await prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name
                }
            });

            const { password: _, ...user } = newUser;

            return NextResponse.json(
                { message: "User created successfully", user: user },
                { status: 201 }
            );
        } catch (prismaError) {
            if (prismaError instanceof Prisma.PrismaClientKnownRequestError) {
                if (prismaError.code === 'P2002') {
                    return NextResponse.json(
                        { error: "Email already exists" },
                        { status: 400 }
                    );
                }
            }
            throw prismaError; // Re-lanzar para que lo capture el catch exterior
        }

    } catch (error) {
        // Mejorar el log del error
        console.error('Error completo:', error);
        
        return NextResponse.json(
            { 
                error: "Error creating user",
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}