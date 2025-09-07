import { gql } from "graphql-request";

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ TENANT MUTATION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

// Create company and admin
export const CREATE_TENANT = gql`
mutation CreateTenant($orgName: String!, $adminName: String!, $adminUsername: String!, $adminEmail: String!, $adminPassword: String!) {
  createTenant(orgName: $orgName, adminName: $adminName, adminUsername: $adminUsername, adminEmail: $adminEmail, adminPassword: $adminPassword) {
    id
    name
    createdAt
  }
}`

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  USER MUTATIONS ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// Create a new user (Admin only)
export const CREATE_USER = gql`
mutation Mutation($name: String!, $username: String!, $email: String!, $password: String!, $role: String!) {
  createUser(name: $name, username: $username, email: $email, password: $password, role: $role) {
    id
    name
    username
    email
    role
    avatar
  }
}
`;

// Update user profile
export const UPDATE_USER_PROFILE = gql`
mutation UpdateUserProfile($id: String!, $name: String, $username: String, $email: String, $avatar: String) {
  updateUserProfile(id: $id, name: $name, username: $username, email: $email, avatar: $avatar) {
    id
    name
    username
    email
    role
    avatar
  }
}
`;

// Update user role (Admin only)
export const UPDATE_USER_ROLE = gql`
mutation UpdateUserRole($id: String!, $role: String!) {
  updateUserRole(id: $id, role: $role)
}
`;

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~   PRODUCT MUTATIONS ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

// Add a new product
export const ADD_PRODUCT = gql`
mutation Mutation($title: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imgUrl: String!) {
  createProduct(title: $title, description: $description, category: $category, price: $price, stock: $stock, imgUrl: $imgUrl) {
    id
    title
    description
    category
    price
    stock
    imgUrl
  }
}
`;



// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~   SALE MUTATIONS ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

// Add a sale
export const ADD_SALE = gql`
mutation Mutation($productId: String!, $quantity: Int!) {
  createSale(productId: $productId, quantity: $quantity)
}
`;




