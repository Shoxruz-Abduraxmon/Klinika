const Router = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('indexLogin');
})

router.post('/login', (req, res) => {
    res.redirect('home');
})

module.exports = router