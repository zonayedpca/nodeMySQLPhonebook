const express = require('express'),
      graphqlHTTP = require('express-graphql'),
      { expressConfigs, expressMiddlewares } = require('./config'),
      { rootRoute, loginRoute, registerRoute, phonebookRoute, logoutRoute } = require('./routes'),
      { schema, rootValue } = require('./graphql'),
      { isAuth } = require('./middlewares'),
      cors = require('cors');

const app = express();

app.use(isAuth);

app.use('/graphql', cors(), graphqlHTTP({
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
