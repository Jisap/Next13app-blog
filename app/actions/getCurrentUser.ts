import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../lib/prismadb";

export const getSession = async() => {
    return await getServerSession( authOptions )
}

export const getCurrentUser = async() => {
    try {
        const session = await getSession(); // La session contiene los datos de logueo name, email, image

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({ // Buscamos un usuario en bd que coincida con el de la session(logueado)
            where: {
                email: session.user.email as string,
            }
        });

        if (!currentUser) {
            return null;
        }


        return {                                                            // Le añadimos createdAt etc
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        };
    } catch (error) {
        return null
    }
}

export default getCurrentUser; // getCurrentUser contiene el usuario de bd logueado mas las fechas de creación y actualización