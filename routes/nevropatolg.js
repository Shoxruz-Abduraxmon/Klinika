const Router = require('express');

const router = Router();

router.get('/nevropatolg', (req, res) => {
    res.render('nevropatolg');
})

module.exports = router;