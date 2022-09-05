const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            email: email.toLowerCase(),
          }).exec();

          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }

          const isMatch = await user.comparePassword(password);

          if (isMatch) {
            return done(null, user);
          }

          return done(null, false, { msg: 'Invalid password.' });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
