const util = require('util'),
      bcrypt = require('bcrypt'),
      getToken = require('./token'),
      login = require('./login'),
      register = require('./register'),
      phonebook = require('./phonebook'),
      phone = require('./phone'),
      newphone = require('./newphone'),
      updatephone = require('./updatephone'),
      logout = require('./logout');

const rootValue = {
  getToken,
  login,
  register,
  phonebook,
  phone,
  newphone,
  updatephone,
  logout
};

module.exports = rootValue;
