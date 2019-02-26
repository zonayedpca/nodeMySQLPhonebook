const { connection } = require('../../database');

const updatephone = async({id, userId, name, phone}) => {
  console.log('Update Hit');
  const query = `
    UPDATE phones
    SET name = ?, phone = ?
    WHERE id = ? AND user_id = ?;
  `;
  const createPhone = await connection.query(query, [name, phone, id, userId]);
  return true
}

module.exports = updatephone;
