const Router = require('express');

const router = Router();

router.get('/Ortaped', (req, res) => {
    res.render('Ortaped');
})

module.exports = router;