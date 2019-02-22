const express = require('express'),
      { expressConfigs, expressMiddlewares } = require('./config'),
      { rootRoute, loginRoute, registerRoute, phonebookRoute, logoutRoute } = require('./routes');

const app = express();

// For Graphql
const { connection } = require('./database');
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql');
const util = require('util');
const bcrypt = require('bcrypt');
connection.query = util.promisify(connection.query);
const schema = buildSchema(`
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
`);

const rootValue = {
  user: async() => {
    const getUsers = await connection.query(`SELECT * FROM users`);
    return getUsers;
  },
  phonebook: async({userId}) => {
    const getPhonebook = await connection.query(`
      SELECT phones.id, name, username, phones.phone
      FROM users
      JOIN phones
        ON phones.user_id = users.id
      WHERE phones.user_id = ?
      ORDER BY name;
    `, userId);
    return getPhonebook;
  },
  phone: async({id, userId}) => {
    const getPhone = await connection.query(`
      SELECT * FROM phones WHERE id = '${id}' AND user_id = '${userId}';
    `);
    console.log(getPhone);
    return getPhone[0];
  },
  login: async({username, password}) => {
    console.log(username, password);
    let getLogin = await connection.query(`
      SELECT id, username, password
      FROM users
      WHERE username = ?;
    `, username);
    if(getLogin.length && getLogin[0].username) {
      const match = await bcrypt.compare(password, getLogin[0].password);
      if(match) {
        return getLogin[0]
      } else {
        return {
          id: null,
          username: null
        }
      }
    } else {
      return {
        id: null,
        username: null
      }
    }
  },
  regiser: async({username, password}) => {
    const checkUser = await connection.query(`
      SELECT id, username
      FROM users
      WHERE username = ?;
    `, username);
    if(checkUser.length && checkUser[0].username) {
      return {
        id: null,
        username: null
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const createUser = await connection.query(`
        INSERT INTO users(username, password)
        VALUES('${username}', '${hashedPassword}');
      `);
      const findUser = await connection.query(`
        SELECT id, username FROM users WHERE username = '${username}';
      `);
      return {
        id: findUser[0].id,
        username: findUser[0].username
      }
    }
  },
  newphone: async({name, phone, userId}) => {
    const createPhone = await connection.query(`
      INSERT INTO phones
      SET name = '${name}', phone = '${phone}', user_id = '${userId}';
    `);
    console.log(createPhone);
    return true
  },
  updatephone: async({name, phone, userId}) => {

  },
  login: () => {
    return {
      id: null,
      username: null
    }
  }
};
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));
// For Graphql

expressConfigs(app);
expressMiddlewares(express, app);

rootRoute(app);
loginRoute(app);
registerRoute(app);
phonebookRoute(app);
logoutRoute(app);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});
