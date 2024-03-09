const Router = require('express');

const router = Router();

router.get('/Pediator', (req, res) => {
    res.render('Pediator', {
        title: 'Pediator qabul bo`limi',
        pediatorError: req.flash('pediatorError') 
    });
});

router.post('/pediator', (req, res) => {
    const {ism, familya, ochistva, yili} = req.body;
    
    if(!ism || !familya || !ochistva || !yili) {
        req.flash('pediatorError', 'Barcha qatorni to`ldiring !!!')
        res.redirect('Pediator');
        return
    }

    const pediatorBemor = {
        ism: req.body.ism,
        familya: req.body.familya,
        ochistva: req.body.ochistva,
        yili: req.body.yili
    }

    console.log(pediatorBemor);

    res.redirect('home')
})

module.exports = router;