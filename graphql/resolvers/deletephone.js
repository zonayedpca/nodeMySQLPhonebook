const { connection } = require('../../database');

const deletephone = async({id}, { userId }) => {
  const query = `
    DELETE FROM phones
    WHERE id = ? AND user_id = ?;
  `;
  const deleted = await connection.query(query, [id, userId]);
  return true;
}

module.exports = deletephone;
