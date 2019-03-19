const bcrypt = require('bcrypt');

const passEncrypt = async password => {
  let result;
  const hashedPassword = await bcrypt.hash(password, 12);
  result = hashedPassword;
  return result;
}

module.exports = passEncrypt;
