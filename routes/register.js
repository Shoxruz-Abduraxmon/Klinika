const Router = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


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

        const user = await User.create(userData)
        console.log(user)
        res.redirect('/');
    }catch (err) {
        console.log(err);
        res.redirect('/register')
        return
    }
});

module.exports = router;