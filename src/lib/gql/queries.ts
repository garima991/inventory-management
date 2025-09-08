import { gql } from "graphql-request"

// ~ ~ ~ ~ ~ ~ ~ ~ ~ USER MUTATIONS ~ ~ ~ ~ ~ ~ ~ ~ ~

// Login user
export const LOGIN_USER = gql`
query Query($userCred: String!, $password: String!) {
  loginUser(userCred: $userCred, password: $password)
}
`;

// Get current logged-in user
export const GET_CURRENT_USER = gql`
query CurrentUser {
  currentUser {
    id
    name
    username
    email
    role
    avatar
    tenantId
  }
}
`;

// Get all users (Admin/Manager)
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

// ~ ~ ~ ~ ~ ~ ~ ~ ~ PRODUCT QUERIES ~ ~ ~ ~ ~ ~ ~ ~ ~

// Get all products
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

// Get product by ID
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

// ~ ~ ~ ~ ~ ~ ~ ~ ~ SALES QUERIES ~ ~ ~ ~ ~ ~ ~ ~ ~

// Get all sales
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

// Get sales by category
export const GET_SALES_BY_CATEGORY = gql`
query GetSalesByCategory {
  getSalesByCategory {
    category
    totalQuantity
    totalRevenue
  }
}
`

// Get sales by product
export const GET_SALES_BY_PRODUCT = gql`
  query GetSalesByProduct($productId: String!) {
    getSalesByProduct(productId: $productId) {
      id
      quantity
      createdAt
    }
  }
`;