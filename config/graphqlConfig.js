// const cors = require('cors'),
//       graphqlHTTP = require('express-graphql'),
//       { schema, rootValue } = require('../graphql'),
//       { isAuth } = require('../middlewares');
//
// module.exports = app => {
//   app.use(isAuth);
//   app.use(cors());
//   app.use('/graphql', cors(), graphqlHTTP({
//     schema,
//     rootValue,
//     graphiql: true
//   }));
// }
