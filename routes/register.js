const Router = require('express');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const {name, email, password, resPassword} = req.body;
    res.redirect('indexLogin');
    console.log(name);
});

module.exports = router;