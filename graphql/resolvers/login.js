const bcrypt = require('bcrypt'),
      { connection } = require('../../database');

const login = async({username, password}) => {
  const query = `
    SELECT id, username, password
    FROM users
    WHERE username = ?;
  `;
  const getLogin = await connection.query(query, username);
  if(getLogin.length && getLogin[0].username) {
    const match = await bcrypt.compare(password, getLogin[0].password);
    if(match) {
      return getLogin[0];
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
}

module.exports = login;
