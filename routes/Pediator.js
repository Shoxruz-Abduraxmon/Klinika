const Router = require('express');

const router = Router();

router.get('/Pediator', (req, res) => {
    res.render('Pediator');
});


module.exports = router;