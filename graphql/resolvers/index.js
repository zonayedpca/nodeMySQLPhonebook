const login = require('./login'),
      register = require('./register'),
      phonebook = require('./phonebook'),
      phone = require('./phone'),
      newphone = require('./newphone'),
      updatephone = require('./updatephone'),
      deletephone = require('./deletephone');

const rootValue = {
  login,
  register,
  phonebook,
  phone,
  newphone,
  updatephone,
  deletephone
};

module.exports = rootValue;
