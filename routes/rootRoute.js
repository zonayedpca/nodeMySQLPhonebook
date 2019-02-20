const rootRoute = app => {
  app.get('/', (req, res) => {
    const { userId: user } = req.session;
    res.render('index', { user });
  });
}

module.exports = rootRoute;
