const Router = require('express');
const Pediator = require('../models/Pediator');

const router = Router();

router.get('/Pediator', (req, res) => {
    res.render('Pediator', {
        title: 'Pediator qabul bo`limi',
        pediatorError: req.flash('pediatorError') 
    });
});

router.post('/pediator', async (req, res) => {
    const {ism, familya, ochistva, yili} = req.body;
    
    if(!ism || !familya || !ochistva || !yili) {
        req.flash('pediatorError', 'Barcha qatorni to`ldiring !!!')
        res.redirect('Pediator');
        return
    }

    // const pediatorBemor = {
    //     ism: req.body.ism,
    //     familya: req.body.familya,
    //     ochistva: req.body.ochistva,
    //     yili: req.body.yili
    // }

    try{
        const PediatorDb = await Pediator.create(req.body);
        console.log(PediatorDb);

    res.redirect('home')
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;