const Router = require('express');

const router = Router();

router.get('/home', (req, res) => {
    res.render('home');
})

router.post('/nevropatolg', (req, res) => {
    res.redirect('nevropatolg');
})
module.exports = router