const passport = require('passport');
const User = require('../models/User');

module.exports = {
  getLogin: (req, res) => {
    res.render('login', { title: 'Login' });
  },
  postLogin: (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash('error', 'All fields must be filled');
      return res.redirect('/login');
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        req.flash('error', info.msg);
        return res.redirect('/login');
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/inventory');
      });
    })(req, res, next);
  },
  logout: async (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy();
      res.redirect('/');
    });
  },
  getSignup: (req, res) => {
    res.render('signup', { title: 'Signup' });
  },
  postSignup: async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
      const user = await User.signup(
        username,
        email,
        password,
        confirmPassword
      );
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/inventory');
      });
    } catch (err) {
      req.flash('error', err.message);
      return res.redirect('/signup');
    }
  },
};
