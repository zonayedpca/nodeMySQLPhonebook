const { isGuest } = require('../middlewares'),
      { connection } = require('../database'),
      bcrypt = require('bcrypt');

const registerRoute = app => {
  app.get('/register', isGuest, (req, res) => {
    res.render('register');
  });

  app.post('/register', isGuest, (req, res) => {
    const { username, password } = req.body;
    const checkUserQuery = `
      SELECT username
      FROM users
      WHERE username = ?;
    `;
    connection.query(checkUserQuery, username, (err, result) => {
      if(err) return res.redirect('/register');
      else {
        if(result.length && result[0].username) {
          return res.redirect('/login');
        } else {
          if(username && password) {
            bcrypt.hash(password, 12, function(err, hashedPassword) {
              if(err) return res.redirect('/register');
              else {
                const createQuery = `
                  INSERT INTO users(username, password)
                  VALUES('${username}', '${hashedPassword}');
                `;
                connection.query(createQuery, (err, result) => {
                  if(err) return res.redirect('/login');
                  else {
                    const findUser = `
                      SELECT id FROM users WHERE username = '${username}';
                    `;
                    connection.query(findUser, (err, result) => {
                      if(err) return res.redirect('/login');
                      else {
                        req.session.userId = result[0].id;
                        req.flash('info', `Welcome to Phonebook`);
                        return res.redirect('/phonebook');
                      }
                    });
                  }
                });
              }
            });
          } else {
            return res.redirect('/register');
          }
        }
      };
    });
  });
}

module.exports = registerRoute;
