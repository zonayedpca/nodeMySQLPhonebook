const express = require('express'),
      graphqlHTTP = require('express-graphql'),
      { expressConfigs, expressMiddlewares } = require('./config'),
      { rootRoute, loginRoute, registerRoute, phonebookRoute, logoutRoute } = require('./routes'),
      { schema, rootValue } = require('./graphql'),
      jwt = require('jsonwebtoken');

const app = express();

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

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

expressConfigs(app);
expressMiddlewares(express, app);

rootRoute(app);
loginRoute(app);
registerRoute(app);
phonebookRoute(app);
logoutRoute(app);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});
