import { gql } from "graphql-request"

export const LOGIN_USER = gql`
  query LoginUser($userCred: String!, $password: String!) {
  loginUser(userCred: $userCred, password: $password) {
    id
    name
    username
    email
    role
    avatar
  }
}
`;


export const GET_ALL_USERS = gql`
query GetAllUsers {
  getAllUsers {
    id
    username
    role
    name
    email
    avatar
  }
}
`

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts {
  getAllProducts {
    id
    title
    description
    category
    price
    stock
    imgUrl
  }
}
`

export const GET_PRODUCT_BY_ID = gql`
query GetProductById($id: String!) {
  getProductById(id: $id) {
    id
    title
    description
    category
    price
    stock
    imgUrl
    sales {
      id
      productId
      quantity
      createdAt
    }
  }
}
`

export const GET_ALL_SALES = gql`
query GetAllSales {
  getAllSales {
    id
    productId
    quantity
    createdAt
    product {
      id
      title
      category
      price
    }
  }
}
`

export const GET_SALES_BY_CATEGORY = gql`
query GetSalesByCategory {
  getSalesByCategory {
    category
    totalQuantity
    totalRevenue
  }
}
`

export const GET_SALES_BY_PRODUCT = gql`
  query GetSalesByProduct($productId: String!) {
    getSalesByProduct(productId: $productId) {
      id
      quantity
      createdAt
    }
  }
`;