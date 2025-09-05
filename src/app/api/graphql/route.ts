import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs } from "./typeDefs";
import { createUser, loginUser, updateUserProfile, updateUserRole, getAllUsers } from "./resolvers/user";
import {createProduct, getAllProducts, getProductById} from "./resolvers/product"
import {createSale, getAllSales, getSalesByCategory, getSalesByProduct} from "./resolvers/sale";
import  getUserFromCookies  from "@/lib/utils/dal";


const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProductById,
    getAllSales,
    getSalesByCategory,
   getSalesByProduct
  },

  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    createProduct,
    createSale
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };