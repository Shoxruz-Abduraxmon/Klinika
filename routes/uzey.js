const Router = require('express');
const Uzey = require('../models/Uzey');

const router = Router();

router.get('/Uzey', (req, res) => {
    res.render('Uzey', {
        title: 'Uzey qabul bo`limi',
        uzeyError: req.flash('uzeyError')
    });
});

router.post('/uzey', async (req, res) => {
    const {ism, familya, ochistva, yili, tashhisi, tavsiya, qaytaKoruv} = req.body;

    

    if(!ism || !familya || !ochistva || !yili) {
        req.flash('uzeyError', 'Barcha qatorlarni to`ldiring !!!');
        res.redirect('Uzey');
        return
    }

    const tashhisiNol = tashhisi || 0;
    const tavsiyaNol = tavsiya || 0;
    const qaytaKoruvNol = qaytaKoruv || 0;

   
    try{
    const uzeydb = await Uzey.create({
        ism,
        familya,
        ochistva,
        yili,
        tashhisi: tashhisiNol,
        tavsiya: tavsiyaNol,
        qaytaKoruv: qaytaKoruvNol
    });
    console.log(uzeydb);

    res.redirect('home');
    
}catch (err) {
    console.log(err);
}
    
});


router.post('/uzeyIstor', async (req, res) => {

    try{
        const id = req.body.id;

        const uzeyIstor = await Uzey.find().lean();
        const uzeyyId = await Uzey.findById(id).lean();

        res.render('Uzey', {
            title: 'Uzey qabul bo`limi',
            uzeyIstor: uzeyIstor,
            uzeyId: uzeyyId
        });

        // console.log(json(uzeyyId));
        // console.log(uzeyyId);

    } catch (err) {
        console.log('UzeyIstorda ERROR ' + err)
    }
})

module.exports = router;