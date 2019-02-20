const { isAuthenticate } = require('../middlewares'),
      { connection } = require('../database');

const phonebookRoute = app => {
  app.get('/phonebook', isAuthenticate, (req, res) => {
    const getPhones = `
      SELECT phones.id, name, username, phones.phone
      FROM users
      JOIN phones
        ON phones.user_id = users.id
      WHERE phones.user_id = ?;
    `;
    connection.query(getPhones, req.userId, (err, result) => {
      if(err) console.log(err);
      else res.render('phonebook', { result, info: req.flash('info') });
    });
  });

  app.post('/phonebook', isAuthenticate, (req, res) => {
    const { name, code, phone } = req.body;
    const phoneNumber = `+${code}-${phone}`;
    const createPhone = `
      INSERT INTO phones
      SET name = ?, phone = ?, user_id = ?;
    `;
    connection.query(createPhone, [name, phoneNumber, req.userId], (err, result) => {
      if(err) console.log(err);
      else {
        return res.redirect('/phonebook');
      };
    });
  });

  app.delete('/phonebook/:id', isAuthenticate, (req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const deleteQuery = `
      DELETE FROM phones WHERE id = ${id} AND user_id = '${userId}';
    `;
    connection.query(deleteQuery, (err, result) => {
      if(err) console.log(err);
      else {
        return res.redirect('/phonebook');
      }
    });
  });
}

module.exports = phonebookRoute;
