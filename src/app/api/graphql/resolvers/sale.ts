import { prismaClient } from "@/services/prisma";

export const createSale = async (
  _: any,
  args: { productId: string; quantity: number },
  context: any
) => {
  const { user } = context;

  if (!user) throw new Error("Unauthorized");

  try {
    // Ensure the product belongs to the same tenant
    const product = await prismaClient.product.findFirst({
      where: {
        id: args.productId,
        tenantId: user.tenantId,
      },
    });

    if (!product) throw new Error("Product not found or unauthorized");

    // Create the sale
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.productId,
        quantity: args.quantity,
        tenantId: user.tenantId,
      },
    });

    // Decrement stock
    await prismaClient.product.update({
      where: { id: args.productId },
      data: { stock: { decrement: args.quantity } },
    });

    return true;
  } catch (error) {
    console.error("Error creating sale:", error);
    return false;
  }
};

export const getAllSales = async (_: any, __: any, context: any) => {
  const { user} = context;
  if (!user) throw new Error("Unauthorized");

  try {
    const sales = await prismaClient.sale.findMany({
      where: {
        product: {
          tenantId: user.tenantId, // only tenant-specific products
        },
      },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    return sales;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
};

export const getSalesByProduct = async (_: any, args: { productId: string }, context: any) => {
  const { user} = context;
  if (!user) throw new Error("Unauthorized");

  try {
    const sales = await prismaClient.sale.findMany({
      where: {
        productId: args.productId,
        product: {
          tenantId: user.tenantId,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return sales;
  } catch (error) {
    console.error("Error fetching sales by product:", error);
    return [];
  }
};

export const getSalesByCategory = async (_: any, __: any, context: any) => {
  const { user } = context;
  if (!user) throw new Error("Unauthorized");

  try {
    const salesWithProducts = await prismaClient.sale.findMany({
      where: {
        product: { tenantId: user.tenantId },
      },
      include: { product: true },
    });

    const categoryTotals: Record<string, { totalQuantity: number; totalRevenue: number }> = {};

    for (const s of salesWithProducts) {
      const category = String(s.product?.category ?? "OTHERS");
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
};

export const getTopSellingProducts = async (_: any, args: { limit?: number }, context: any) => {
  const { user } = context;
  if (!user) throw new Error("Unauthorized");

  const limit = Math.max(1, Math.min(20, args.limit ?? 5));

  try {
    const salesWithProducts = await prismaClient.sale.findMany({
      where: {
        product: { tenantId: user.tenantId },
      },
      include: { product: true },
    });

    const productTotals: Record<string, { title: string; category: string; price: number; totalQuantity: number; totalRevenue: number }> = {};

    for (const s of salesWithProducts) {
      const productId = s.productId;
      const title = String(s.product?.title ?? "Unknown");
      const category = String(s.product?.category ?? "OTHERS");
      const price = Number(s.product?.price ?? 0);
      const quantity = Number(s.quantity ?? 0);

      if (!productTotals[productId]) {
        productTotals[productId] = { title, category, price, totalQuantity: 0, totalRevenue: 0 };
      }

      productTotals[productId].totalQuantity += quantity;
      productTotals[productId].totalRevenue += quantity * price;
    }

    const sorted = Object.entries(productTotals)
      .map(([productId, data]) => ({ productId, ...data }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, limit);

    return sorted;
  } catch (error) {
    console.error("Error aggregating top selling products:", error);
    return [];
  }
};