import { ProductCategory } from "../../../../../generated/prisma";
import { prismaClient } from "@/services/prisma";

export const createProduct = async (
  _: any,
  args: {
    title: string;
    description: string;
    category: ProductCategory;
    price: number;
    stock: number;
    imgUrl: string;
  },
  context: any
) => {
  try {
    if (!context.user) throw new Error("Unauthorized");

    const createdProduct = await prismaClient.product.create({
      data: {
        ...args,
        tenantId: context.user.tenantId, // automatically assign tenant
      },
    });

    return createdProduct;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProducts = async (_: any, __: any, context: any) => {
  try {
    if (!context.user) throw new Error("Unauthorized");

    const products = await prismaClient.product.findMany({
      where: { tenantId: context.user.tenantId }, // scoped to tenant
    });

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductById = async (_: any, args: { id: string }, context: any) => {
  try {
    if (!context.user) throw new Error("Unauthorized");

    const product = await prismaClient.product.findFirst({
      where: {
        id: args.id,
        tenantId: context.user.tenantId, // prevent cross-tenant access
      },
      include: {
        sales: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};
