const { isGuest } = require('../middlewares'),
      { connection } = require('../database'),
      bcrypt = require('bcrypt');

const loginRoute = app => {
  app.get('/login', isGuest, (req, res) => {
    res.render('login', { error: req.flash('error') });
  });

  app.post('/login', isGuest, async(req, res) => {
    const { username, password } = req.body;
    const checkUserQuery = `
      SELECT id, username, password
      FROM users
      WHERE username = ?;
    `;
    try {
      const result = await connection.query(checkUserQuery, username);
      if(result.length && result[0].username) {
        const correct = await bcrypt.compare(password, result[0].password);
        if(correct) {
          req.session.userId = result[0].id;
          req.flash('info', `Successfully logged in`);
          return res.redirect('/phonebook');
        } else {
          req.flash('error', `Incorrect credentials`);
          return res.redirect('/login')
        }
      } else {
        req.flash('error', `No User Found`);
        return res.redirect('/login');
      }
    } catch(e) {
      if(err) return res.redirect('/login');
    }
  });
}

module.exports = loginRoute;
