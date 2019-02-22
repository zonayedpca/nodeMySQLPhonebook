const { isGuest } = require('../middlewares'),
      { connection } = require('../database'),
      bcrypt = require('bcrypt');

const registerRoute = app => {
  app.get('/register', isGuest, (req, res) => {
    res.render('register');
  });

  app.post('/register', isGuest, async(req, res) => {
    const { username, password } = req.body;
    const checkUserQuery = `
      SELECT username
      FROM users
      WHERE username = ?;
    `;
    try {
      const result = await connection.query(checkUserQuery, username);
      if(result.length && result[0].username) {
        return res.redirect('/login');
      } else {
        if(username && password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          const createQuery = `
            INSERT INTO users
            SET username = ?, password = ?;
          `;
          const result = await connection.query(createQuery, [username, hashedPassword]);
          const findUser = `
            SELECT id
            FROM users
            WHERE username = ?;
          `;
          const user = await connection.query(findUser, [username]);
          req.session.userId = user[0].id;
          req.flash('info', `Welcome to Phonebook`);
          return res.redirect('/phonebook');
        } else {
          return res.redirect('/register');
        }
      }
    } catch(e) {
      return res.redirect('/register');
    }
  });
}

module.exports = registerRoute;
