const bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      { connection } = require('../../database');

const register = async({username, password}) => {
  const queryCheckUser = `
    SELECT id, username
    FROM users
    WHERE username = ?;
  `;
  const checkUser = await connection.query(queryCheckUser, [username]);
  if(checkUser.length && checkUser[0].username) {
    return {
      id: null,
      username: null
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const queryRegister = `
      INSERT INTO users
      SET username = ?, password = ?;
    `;
    const createUser = await connection.query(queryRegister, [username, hashedPassword]);
    const queryFindUser = `
      SELECT id, username FROM users WHERE username = ?;
    `;
    const findUser = await connection.query(queryFindUser, [username]);
    return {
      id: findUser[0].id,
      username: findUser[0].username
    }
  }
}

module.exports = register;
