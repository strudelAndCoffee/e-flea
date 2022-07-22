const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        userName: String
        email: String
        orders: [Order]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        me: User
        users: [User]
        user(_id: ID!): User
        orders: [Order]
        order(_id: ID!): Order
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): Auth
        addOrder(products: [ID]!): Order
        addProduct(name: String!, description: String, image: String, price: Float!, quantity: Int, category: ID!): Product
        addCategory(name: String!): Category
        updateUser(firstName: String, lastName: String, userName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        deleteUser(_id: ID!): User
        deleteProduct(_id: ID!): Product
        deleteCategory(_id: ID!): Category
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;