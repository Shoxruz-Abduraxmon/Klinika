const express = require('express');
const epxHbs = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const routerLogin = require('./routes/login');
const routerHome = require('./routes/home');
const routerNevropatolg = require('./routes/nevropatolg');

const app = express();

const hbs = epxHbs.create({
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(routerLogin);
app.use(routerHome);
app.use(routerNevropatolg);

const PORT = process.env.PORT || 1994;

app.listen(PORT, () => {
    console.log(`localhost: ${PORT}`);
});
