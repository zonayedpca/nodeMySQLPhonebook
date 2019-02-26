const bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      { connection } = require('../../database');

const getToken = async({username, password}) => {
  const query = `
    SELECT id, username, password
    FROM users
    WHERE username = ?;
  `;
  const getToken = await connection.query(query, username);
  console.log(getToken);
  if(getToken.length && getToken[0].username) {
    const match = await bcrypt.compare(password, getToken[0].password);
    if(match) {
      const user = {
        id: getToken[0].id,
        username: getToken[0].username
      };
      const token = jwt.sign(user, 'secretkey');
      return {
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

module.exports = getToken;
