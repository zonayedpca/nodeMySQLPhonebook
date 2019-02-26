const jwt = require('jsonwebtoken');

const getToken = user => {
  const token = jwt.sign(user, 'secretkey');
  return token;
}

module.exports = getToken;
