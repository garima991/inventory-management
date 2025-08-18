import { prismaClient } from "@/services/prisma";
import ProductCategory from "../../../../../generated/prisma"

export const createSale = async (_: any, args: {
    productId: string,
    quantity: number,
}) => {
    try {
        const sale = await prismaClient.sale.create({
            data: {
                productId: args.productId,
                quantity: args.quantity,
            }
        });
        if(sale){
            await prismaClient.product.update({
                where: {
                    id : args.productId
                },
                data: {
                    stock: {
                        decrement: args.quantity
                    }
                }
            })
        }
        return true;
    } catch (error) {
        console.error("Error creating sale:", error);
        return false;
    }

}

export const getAllSales = async () => {
    try {
        const sales = await prismaClient.sale.findMany({
            include: { product: true },
            orderBy: { createdAt: 'desc' }
        });
        return sales;
    } catch (error) {
        console.error("Error fetching sales:", error);
        return [];
    }
}

// export const getSaleByCategory = async (_: any, args:{
//     category: ProductCategory
// }) => {
//     try{
//         const sales = await prismaClient.sale.findMany({
//             where:{
//                 product: {
//                     category: args.category
//                 }
//             }
//         })
//         return sales;
//     }
//     catch(error){
//         console.log(error);
//         return [];
//     }
// }

export const getSalesByProduct = async (_: any, args: { productId: string }) => {
    try {
        return await prismaClient.sale.findMany({
            where: { productId: args.productId },
            include: { product: true },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error fetching sales by product:", error);
        return [];
    }
};


export const getSalesByCategory = async () => {
    try {
        const salesWithProducts = await prismaClient.sale.findMany({
            include: { product: true }
        });

        const categoryTotals: Record<string, { totalQuantity: number; totalRevenue: number }> = {};

        for (const s of salesWithProducts) {
            const category = String(s.product?.category ?? 'OTHERS');
            const price = Number(s.product?.price ?? 0);
            const quantity = Number(s.quantity ?? 0);
            if (!categoryTotals[category]) {
                categoryTotals[category] = { totalQuantity: 0, totalRevenue: 0 };
            }
            categoryTotals[category].totalQuantity += quantity;
            categoryTotals[category].totalRevenue += quantity * price;
        }

        return Object.entries(categoryTotals).map(([category, totals]) => ({
            category,
            totalQuantity: totals.totalQuantity,
            totalRevenue: totals.totalRevenue,
        }));
    } catch (error) {
        console.error("Error aggregating sales by category:", error);
        return [];
    }
}