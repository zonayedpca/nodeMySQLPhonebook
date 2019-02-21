const { isAuthenticate } = require('../middlewares'),
      { connection } = require('../database');

const phonebookRoute = app => {
  app.get('/phonebook', isAuthenticate, (req, res) => {
    const getPhones = `
      SELECT phones.id, name, username, phones.phone
      FROM users
      JOIN phones
        ON phones.user_id = users.id
      WHERE phones.user_id = ?
      ORDER BY name;
    `;
    connection.query(getPhones, req.userId, (err, result) => {
      if(err) return res.redirect('/');
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
      if(err) return res.redirect('/phonebook');
      else {
        return res.redirect('/phonebook');
      };
    });
  });

  app.get('/phonebook/:id/edit', isAuthenticate, (req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const findQuery = `
      SELECT * FROM phones WHERE id = ? AND user_id = ?;
    `;
    connection.query(findQuery, [id, userId], (err, result) => {
      if(err) return res.redirect('/phonebook');
      else {
        const fullPhone = result[0].phone.replace('+', '').split('-'),
              id = result[0].id,
              code = fullPhone[0],
              phone = fullPhone[1],
              name = result[0].name;

        const data = {
          id,
          code,
          phone,
          name
        }
        res.render('edit', { data });
      }
    });
  });

  app.put('/phonebook/:id', isAuthenticate, (req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const { code, phone, name } = req.body;
    const fullPhone = `+${code}-${phone}`;

    const updateQuery = `
      UPDATE phones
      SET name = ?, phone = ?
      WHERE id = ?;
    `;
    connection.query(updateQuery, [name, fullPhone, id], (err, result) => {
      if(err) return res.redirect('/phonebook');
      else {
        return res.redirect('/phonebook');
      }
    });
  });

  app.delete('/phonebook/:id', isAuthenticate, (req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const deleteQuery = `
      DELETE FROM phones WHERE id = ${id} AND user_id = '${userId}';
    `;
    connection.query(deleteQuery, (err, result) => {
      if(err) return res.redirect('/phonebook');
      else {
        return res.redirect('/phonebook');
      }
    });
  });
}

module.exports = phonebookRoute;
