const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generatorJwt = require('../services/token');

const router = Router();

router.get('/', (req, res) => {
    res.render('indexLogin', {
        title: 'Login',
        loginError: req.flash('loginError')
    });
})

router.post('/login',async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('loginError', 'The login or password is incorrect');
        res.redirect('/');
        return; 
    }

    const userNiTopish = await User.findOne({email});
    if(!userNiTopish) {
        req.flash('loginError', 'User not found');
        res.redirect('/');

        return 
    }

    const passwordNiTekshirish = await bcrypt.compare(req.body.password, userNiTopish.password);

    const token = generatorJwt(userNiTopish._id, passwordNiTekshirish._id);

    res.cookie('token', token, {httpOnly: true, secure: true});
    if(!passwordNiTekshirish) {
        req.flash('loginError', 'Password not found');
        res.redirect('/');

        return 
    }  
    res.redirect('home');
})

module.exports = router