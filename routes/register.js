const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generatorJwt = require('../services/token');

const router = Router();


router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        registerError: req.flash('registerError')
    });
});

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        req.flash('registerError', 'Fill in all the lines');
        res.redirect('/register')
        return
    }

    const borEmail = await User.findOne({email})

        if(borEmail) {
            req.flash('registerError', 'User alredy exist')
            res.redirect('/register')
            return
        }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        const user = await User.create(userData);
        const token = generatorJwt(user._id);


        res.cookie('token', token, {httpOnly: true, secure:true});
        res.redirect('/');
        
    }catch (err) {
        console.log(err);
        res.redirect('/register')
        return
    }
});

module.exports = router;