const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Login {
    id: ID
    username: String
    token: String
  }

  type PhoneBook {
    id: ID!
    phone: String!
    name: String!
  }

  type Query {
    login(username: String!, password: String!): Login!
    phonebook: [PhoneBook!]
    phone(id: ID!): PhoneBook
  }

  type Mutation {
    register(username: String!, password: String!): Login!
    newphone(name: String!, phone: String!): Boolean!
    updatephone(id: ID!, name: String!, phone: String!): Boolean!
    deletephone(id: ID!): Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

module.exports = schema;
