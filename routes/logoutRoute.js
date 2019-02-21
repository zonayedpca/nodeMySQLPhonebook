const { isAuthenticate } = require('../middlewares'),
      { connection } = require('../database');

const logoutRoute = app => {
  app.get('/logout', isAuthenticate, (req, res) => {
    req.session.destroy(err => {
      if(err) return res.redirect('/phonebook');
      else {
        res.clearCookie('pid');
        return res.redirect('/login');
      }
    });
  });
}

module.exports = logoutRoute;
