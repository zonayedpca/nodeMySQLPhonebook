const jwt = require('jsonwebtoken'),
      { connection } = require('../../database');

const phonebook = async(args, { userId }) => {
  if(!userId) {
    throw new Error('No user Found!')
  }
  const query = `
    SELECT phones.id, name, username, phones.phone
    FROM users
    JOIN phones
      ON phones.user_id = users.id
    WHERE phones.user_id = ?
    ORDER BY name;
  `;
  const getPhonebook = await connection.query(query, [userId]);
  return getPhonebook;
};

module.exports = phonebook;
