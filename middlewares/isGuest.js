const isGuest = (req, res, next) => {
  if(req.session.userId) {
    req.flash('info', 'You are already logged in');
    return res.redirect('/phonebook');
  }
  next();
}

module.exports = isGuest;
