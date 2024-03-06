const Router = require('express');

const router = Router();

router.get('/Uzey', (req, res) => {
    res.render('Uzey')
})

module.exports = router;