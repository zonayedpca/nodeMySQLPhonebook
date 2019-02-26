const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const token = req.get('Authorization');
  if(token) {
    const originalToken = token.split(' ')[1];
    try {
      const decoded = jwt.verify(originalToken, 'secretkey');
      req.isAuth = true;
      req.userId = decoded.id;
      return next();
    } catch(e) {
      return next();
    }
  }
  next();
}

module.exports = isAuth;
