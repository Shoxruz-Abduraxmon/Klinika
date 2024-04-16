const Router = require('express');
const Ortaped = require('../models/Ortaped');

const router = Router();

router.get('/Ortaped', (req, res) => {
    res.render('Ortaped', {
        title: 'Ortaped qabul bo`limi',
        ortapedError: req.flash('ortapedError')
    });
});


router.post('/ortaped', async (req, res) => {
    const {ism, familya, ochistva, yili, tashhisi, tavsiya, qaytaKoruv} = req.body;

     if(!ism || !familya || !ochistva || !yili) {
        req.flash('ortapedError', 'Barcha qatorni to`ldiring !!!')
        res.redirect('Ortaped');
        return
    }
    
    const tashhisiNol = tashhisi || 0;
    const tavsiyaNol = tavsiya || 0;
    const qaytaKoruvNol = qaytaKoruv || 0;
    
    try{
    const ortaped = await Ortaped.create({
        ism,
        familya,
        ochistva,
        yili,
        tashhisi: tashhisiNol,
        tavsiya: tavsiyaNol,
        qaytaKoruv: qaytaKoruvNol
    });    

    console.log(ortaped);
    res.redirect('home')
    
}catch (err) {
    console.log(err);
} 
});

router.post('/ortapedIstor', async (req, res) => {
    const id = req.body.id;

    try{
        const ortapedBemorIstor = await Ortaped.find().lean();
        const ortapedId = await Ortaped.findById(id).lean();

        res.render('Ortaped', {
            title: 'Ortaped qabul bo`limi',
            ortapedBemorIstor: ortapedBemorIstor,
            ortapedId: ortapedId
        });
    } catch (err) {
        console.log('NevroIstorda ERROR ' + err);
    }
})

module.exports = router;