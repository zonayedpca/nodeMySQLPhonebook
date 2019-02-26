const { connection } = require('../../database');

const phone = async({id, userId}) => {
  const query = `
    SELECT * FROM phones WHERE id = ? AND user_id = ?;
  `;
  const getPhone = await connection.query(query, [id, userId]);
  return getPhone[0];
};

module.exports = phone;
