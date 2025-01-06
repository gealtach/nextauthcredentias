import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma"; 
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'user@clp.com' },
                password: { label: 'Password', type: 'password', placeholder: '******' }
            },
            async authorize(credentials, req) {
                console.log(credentials, 'soucredentials');
                const userFound = await prisma.user.findUnique({ where: { email: credentials?.email } });
                
                if (!userFound) return null;
                
                console.log(userFound, 'soy el userFound');
                if (credentials) {
                    const matchPassword = await bcrypt.compare(credentials?.password, userFound.password);
                    if (!matchPassword) return null;
                    
                    // Asegurarse de que el 'id' es un string
                    return {
                        id: userFound.id.toString(), // Convertir el id a string
                        name: userFound.name,
                        email: userFound.email,
                    };
                }
                return null;
            }
        })
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
