import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean!
    currentUser: User
    getAllUsers: [User]!
    getAllProducts: [Product]!
    getProductById(id: String!): Product
    getAllSales: [Sale]!
    getSalesByCategory: [CategorySales!]
    getSalesByProduct(productId: String!): [Sale]!
  }
  type Mutation {
    createTenant(orgName: String!, adminName: String!, adminUsername: String!, adminEmail: String!, adminPassword: String!): Tenant!
    createUser(name: String!, username: String!, email: String!, password: String!, role: String!): User
    updateUserRole(id: String!, role: String!): Boolean!
    updateUserProfile(id: String!, name: String, username: String, email: String, avatar: String): User
    createProduct(title: String!, description: String!, category: String!, price: Float!, stock: Int!, imgUrl: String!): Product
    createSale(productId: String!, quantity: Int!): Boolean!
  }

  type Tenant {
    id: String!
    name: String!
    createdAt: String!
    # admin: User!
  }

  type User {
    id: String!
    name: String!
    username: String!
    email: String!
    role: String!
    avatar: String
    tenantId: String!
  }

  type Product {
    id: String!
    title: String!
    description: String
    category: String!
    price: Float!
    stock: Int
    imgUrl: String
    sales: [Sale]
    tenantId: String!
  }

  type Sale {
    id: String!
    productId: String!
    quantity: Int!
    createdAt: String!
    product: Product
    tenantId: String!
  }

  type CategorySales {
    category: String!
    totalQuantity: Int!
    totalRevenue: Float!
  }
`;
