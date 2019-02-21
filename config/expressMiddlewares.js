const bodyParser = require('body-parser'),
      session = require('express-session'),
      methodOverride = require('method-override'),
      flash = require('connect-flash');

const expressMiddlewares = (express, app) => {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    name: 'pid',
    resave: false,
    saveUninitialized: false,
    secret: 'phonebooksecret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 2
    }
  }));

  app.use(methodOverride('_method'));

  app.use(flash());

  app.use(express.static('public'))
}

module.exports = expressMiddlewares;
