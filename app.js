const express = require('express');
const { routerUser } = require('./route/routeUser');
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const { routeView } = require('./route/routeView');
const { routeHistory } = require('./route/routeHistory');

const PORT = 7899;

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

//==== FLASH MESSAGE
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { axAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//======
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('layout', './layouts/main');
app.use(routerUser);
app.use(routeView);
app.use(routeHistory);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
