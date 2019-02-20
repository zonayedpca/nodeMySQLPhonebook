const express = require('express'),
      { expressConfigs, expressMiddlewares } = require('./config'),
      { rootRoute, loginRoute, registerRoute, phonebookRoute, logoutRoute } = require('./routes');

const app = express();

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
