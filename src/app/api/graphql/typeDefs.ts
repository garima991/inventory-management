import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!) : User!
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProductById(id: String!): Product
    getAllSales: [Sale]
    getSalesByCategory: [CategorySales!]
    getSalesByProduct(productId: String!): [Sale]
  }
  
  type Mutation{
    createUser(name: String!, username:String!, email:String!, password:String!, role:String!) : User
    updateUserRole(id: String!, role: String!) : Boolean!
    updateUserProfile(id: String!, name: String, username: String, email: String, avatar: String) : User
    createProduct(title: String!, description:String!, category:String!, price:Float!, stock:Int!, imgUrl: String!) : Product
    createSale(productId: String!, quantity: Int!): Boolean!
  }

  type User{
    id: String!
    name: String!
    username: String!
    email: String!
    role: String!
    avatar: String
  }

  
  type Sales{
    id: String!
    product: Product!
    quantity: Int!
    createdAt: String!
  }

  type Product{
    id: String!
    title: String!
    description: String
    category: String!
    price: Float!
    stock: Int
    imgUrl: String
    sales: [Sale]
  }

  type Sale {
    id: String!
    productId: String!
    quantity: Int!
    createdAt: String!
    product: Product
  }

  type CategorySales {
    category: String!
    totalQuantity: Int!
    totalRevenue: Float!
  }

`;