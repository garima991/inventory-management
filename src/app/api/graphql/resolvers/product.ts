import { ProductCategory } from "../../../../../generated/prisma"
import { prismaClient } from "@/services/prisma"

export const createProduct = async (_: any, args: {
    title: string,
    description: string,
    category: ProductCategory,
    price: number,
    stock: number,
    imgUrl: string,
    sales: []
}) => {
    // const {title, description, category, price, stock, imgUrl} = args;
    try {
        const createdProduct = await prismaClient.product.create({
            data: args
        })
        return createdProduct;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllProducts = async () => {
    try {
        const products = await prismaClient.product.findMany({});
        return products;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export const getProductById = async (_: any, args: { id: string }) => {
    const { id } = args;
    try {
        const product = await prismaClient.product.findUnique({
            where: { id },
            include: {
                sales: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}