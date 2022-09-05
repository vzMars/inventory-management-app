const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const inventoryRoutes = require('./routes/inventory');

// Load config
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// Database Connection
connectDB();

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Static folder
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(morgan('dev'));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Express flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', mainRoutes);
app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
