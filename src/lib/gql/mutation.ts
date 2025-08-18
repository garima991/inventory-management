import { gql } from "graphql-request";

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
}`

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
}`


export const ADD_SALE = gql`
mutation Mutation($productId: String!, $quantity: Int!) {
  createSale(productId: $productId, quantity: $quantity)
}`

export const GET_SALE_BY_CATEGORY = gql`

`