const { connection } = require('../../database'),
      util = require('util'),
      bcrypt = require('bcrypt');

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
  login: () => {
    return {
      id: null,
      username: null
    }
  }
};

module.exports = rootValue;
