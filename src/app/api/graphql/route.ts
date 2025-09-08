import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs } from "./typeDefs";
import {
  createUser,
  loginUser,
  updateUserProfile,
  updateUserRole,
  getAllUsers,
  deleteUser,
} from "./resolvers/user";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "./resolvers/product";
import {
  createSale,
  getAllSales,
  getSalesByCategory,
  getSalesByProduct,
} from "./resolvers/sale";
import { createTenant, getTenant } from "./resolvers/tenant";
import getUserFromCookies from "@/lib/utils/dal";


const resolvers = {
  Query: {
    loginUser,
    currentUser: (_: any, __: any, context: any) => context.user, 
    getAllUsers,
    getAllProducts,
    getProductById,
    getAllSales,
    getSalesByCategory,
    getSalesByProduct,
    getTenant
  },

  Mutation: {
    createTenant,
    createUser,
    updateUserRole,
    updateUserProfile,
    createProduct,
    createSale,
    deleteUser
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    // get user from cookies
    const user = await getUserFromCookies();

    return {
      req,
      user, // now every resolver can access context.user
    };
  },
});

export { handler as GET, handler as POST };
