const { connection } = require('../../database');

const newphone = async({name, phone}, {userId}) => {
  const query = `
    INSERT INTO phones
    SET name = ?, phone = ?, user_id = ?;
  `;
  const createPhone = await connection.query(query, [name, phone, userId]);
  return true;
};

module.exports = newphone;
