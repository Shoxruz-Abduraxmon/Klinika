const express = require('express');
const epxHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
dotenv.config();

const routerLogin = require('./routes/login');
const routerHome = require('./routes/home');
const routerNevropatolg = require('./routes/nevropatolg');
const routerOrtaped = require('./routes/Ortaped');
const routerPediator = require('./routes/Pediator');
const routerUzey = require('./routes/uzey');
const routerRegister = require('./routes/register');

/// Vrach uchun
const routerNevropatolgVrach = require('./routes/nevropatolgVrach');
const routerOrtapedVrach = require('./routes/ortapedVrach');
const routerPediatorVrach = require('./routes/pediatorVrach');
const routerUzeyVrach = require('./routes/uzeyVrach'); 

const app = express();

const hbs = epxHbs.create({
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({secret: "Shox", resave: false, saveUninitialized: false}));
app.use(flash());

app.use(routerLogin);
app.use(routerHome);
app.use(routerNevropatolg);
app.use(routerOrtaped);
app.use(routerPediator);
app.use(routerUzey);
app.use(routerRegister);

/// Vrcahlar uchun
app.use(routerNevropatolgVrach);
app.use(routerOrtapedVrach);
app.use(routerPediatorVrach);
app.use(routerUzeyVrach);

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000  
        }
    
        );
        
        console.log('Mongo connected');
        const PORT = process.env.PORT || 1994;

        app.listen(PORT, () => {
            console.log(`localhost: ${PORT}`);
        });

    } catch (err) {
        console.log(err);
        process.exit(1); 
    }
}

connectDB();





