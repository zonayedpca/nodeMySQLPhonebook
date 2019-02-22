const { isAuthenticate } = require('../middlewares'),
      { connection } = require('../database');

const logoutRoute = app => {
  app.get('/logout', isAuthenticate, async(req, res) => {
    try {
      await req.session.destroy;
      res.clearCookie('pid');
      return res.redirect('/login');
    } catch(e) {
      return res.redirect('/phonebook');
    }
  });
}

module.exports = logoutRoute;
