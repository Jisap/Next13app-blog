import prisma from '../lib/prismadb'

export interface IBlogParams {
    user?: string
    userId?: string;
    categories?: string
}

export default async function getBlogs( params: IBlogParams) {

    try {

        const { userId, categories } = params;

        let query: any = {};                    // Inicializamos el query (petición a bd)

        if (userId) {
            query.userId = userId               // Metemos en el query el userIr de los params
        }

        if (categories) {                       // Lo mismo con las categorias            
            query.categories = categories
        }




        const blogs = await prisma.blog.findMany({ // Buscamos en bd según el query, los blogs
            where: query,
            orderBy: {
                createdAt: 'desc'
            },
        });

        const safeBlogs = blogs.map((blog) => ({    // Mapeamos los blogs de la busqueda y le añadimos la fecha de creación en formato string
            ...blog,
            createdAt: blog.createdAt.toISOString(),
        }));

        return safeBlogs;
    } catch (error: any) {
        throw new Error(error);
    }
}