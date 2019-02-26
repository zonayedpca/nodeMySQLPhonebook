const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Token {
    token: String
  }

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
    getToken(username: String!, password: String!): Token
    login(username: String!, password: String!): Login!
    phonebook: [PhoneBook!]
    phone(id: ID! userId: Int!): PhoneBook
  }

  type Mutation {
    register(username: String!, password: String!): Login!
    newphone(name: String!, phone: String!, userId: ID!): Boolean!
    updatephone(id: ID!, userId: ID!, name: String!, phone: String!): Boolean!
    logout: Login
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

module.exports = schema;
