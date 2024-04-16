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
    const {ism, familya, ochistva, yili, tashhisi, tavsiya, qaytaKoruv} = req.body;
    
    if(!ism || !familya || !ochistva || !yili) {
        req.flash('pediatorError', 'Barcha qatorni to`ldiring !!!')
        res.redirect('Pediator');
        return
    }

    const tashhisiNol = tashhisi || 0;
    const tavsiyaNol = tavsiya || 0;
    const qaytaKoruvNol = qaytaKoruv || 0;

    try{
        const PediatorDb = await Pediator.create({
            ism,
            familya,
            ochistva,
            yili,
            tashhisi: tashhisiNol,
            tavsiya: tavsiyaNol,
            qaytaKoruv: qaytaKoruvNol
        });
        console.log(PediatorDb);

    res.redirect('home')
    } catch (err) {
        console.log(err);
    }
    
});


router.post('/pediatorIstor', async (req, res) => {

    try{
        const id = req.body.id;

        const pediatorIstor = await Pediator.find().lean();

        res.render('Pediator', {
            title: 'Pediator qabul bo`limi',
            pediatorIstor: pediatorIstor
        })
    } catch (err) {
        console.log('PediatorIstorda ERROR ' + err);
    }
})

module.exports = router;