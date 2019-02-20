const isAuthenticate = (req, res, next) => {
  if(req.session.userId) {
    req.userId = req.session.userId;
    next();
  } else {
    req.flash('error', 'Please Login to See Your Phonebook');
    return res.redirect('/login');
  }
}

module.exports = isAuthenticate;
