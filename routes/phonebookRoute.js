const { isAuthenticate } = require('../middlewares'),
      { connection } = require('../database');

const phonebookRoute = app => {
  app.get('/phonebook', isAuthenticate, async(req, res) => {
    const getPhones = `
      SELECT phones.id, name, username, phones.phone
      FROM users
      JOIN phones
        ON phones.user_id = users.id
      WHERE phones.user_id = ?
      ORDER BY name;
    `;
    try {
      const result = await connection.query(getPhones, req.userId);
      res.render('phonebook', { result, info: req.flash('info') });
    } catch(e) {
      return res.redirect('/');
    }
  });

  app.post('/phonebook', isAuthenticate, async(req, res) => {
    const { name, code, phone } = req.body;
    const phoneNumber = `+${code}-${phone}`;
    const createPhone = `
      INSERT INTO phones
      SET name = ?, phone = ?, user_id = ?;
    `;
    try {
      await connection.query(createPhone, [name, phoneNumber, req.userId]);
      return res.redirect('/phonebook');
    } catch(e) {
      return res.redirect('/phonebook');
    }
  });

  app.get('/phonebook/:id/edit', isAuthenticate, async(req, res) => {
    const { userId } = req;
    const { id: phoneID } = req.params;
    const findQuery = `
      SELECT * FROM phones WHERE id = ? AND user_id = ?;
    `;
    try {
      const result = await connection.query(findQuery, [phoneID, userId]);
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
    } catch(e) {
      return res.redirect('/phonebook');
    }
  });

  app.put('/phonebook/:id', isAuthenticate, async(req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const { code, phone, name } = req.body;
    const fullPhone = `+${code}-${phone}`;

    const updateQuery = `
      UPDATE phones
      SET name = ?, phone = ?
      WHERE id = ?;
    `;
    try {
      await connection.query(updateQuery, [name, fullPhone, id]);
      return res.redirect('/phonebook');
    } catch(e) {
      return res.redirect('/phonebook');
    }
  });

  app.delete('/phonebook/:id', isAuthenticate, async(req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const deleteQuery = `
      DELETE FROM phones WHERE id = ? AND user_id = ?;
    `;
    try {
      await connection.query(deleteQuery, [id, userId]);
      return res.redirect('/phonebook');
    } catch(e) {
      return res.redirect('/phonebook')
    }
  });
}

module.exports = phonebookRoute;
