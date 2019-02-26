const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Login {
    id: ID
    username: String
  }

  type PhoneBook {
    id: ID!
    phone: String!
    name: String!
  }

  type Query {
    login(username: String!, password: String!): Login!
    phonebook(userId: Int!): [PhoneBook!]
    phone(id: ID! userId: Int!): PhoneBook
  }

  type Mutation {
    regiser(username: String!, password: String!): Login!
    newphone(name: String!, phone: String!, userId: ID!): Boolean!
    updatephone(name: String!, phone: String!, userId: ID!): Boolean!
    logout: Login
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
