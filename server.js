const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
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

// Method override
app.use(methodOverride('_method'));

// Logging
app.use(morgan('dev'));

// Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express flash
app.use(flash());

// Routes
app.use('/', mainRoutes);
app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
