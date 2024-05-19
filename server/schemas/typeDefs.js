const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        userById(_id: ID!): User
        userByUsername(username: String!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth

        saveBook(userId: ID!, bookId: String!): User
        deleteBook: (bookId: String!): User
    }
`

module.exports = typeDefs;