const bcrypt = require('bcrypt'),
      { getToken } = require('../utils'),
      { connection } = require('../../database');

const login = async({username, password}) => {
  const query = `
    SELECT id, username, password
    FROM users
    WHERE username = ?;
  `;
  const theUser = await connection.query(query, username);
  if(theUser.length && theUser[0].username) {
    const match = await bcrypt.compare(password, theUser[0].password);
    if(match) {
      const user = {
        id: theUser[0].id,
        username: theUser[0].username
      };
      const token = getToken(user);
      return {
        id: theUser[0].id,
        username: theUser[0].username,
        token
      }
    } else {
      return {
        token: null
      }
    }
  } else {
    return {
      token: null
    }
  }
}

module.exports = login;
