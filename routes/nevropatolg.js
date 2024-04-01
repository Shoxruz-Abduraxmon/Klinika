const Router = require('express');
const Bemor = require('../models/Bemor');
const moment = require('moment');

const router = Router();

router.get('/nevropatolg', (req, res) => {
    res.render('nevropatolg', {
        title: 'Nevrapatolg qabul bo`limi',
        bemorlar: 'bemorlar',
        nevropatolgError: req.flash('nevropatolgError')
    });
})

router.post('/nevro', async (req, res) => {
    const {ism, familya, ochistva, yili, tashhisi, tavsiya, qaytaKoruv} = req.body;

   if(!ism || !familya || !ochistva || !yili) {
    req.flash('nevropatolgError', 'Barcha qatorlarni to`ldiring !!!')

    res.redirect('nevropatolg');
    return
   }

   const tashhisiNol = tashhisi || 0;
   const tavsiyaNol = tavsiya || 0;
   const qaytaKoruvNol = qaytaKoruv || 0;
//    const bemorlar = {
//     ism: req.body.ism,
//     familya: req.body.familya,
//     ochistva: req.body.ochistva,
//     yili: req.body.yili
//    }
    
   try{
    const newroBemor = Bemor.create({
        ism, 
        familya,
        ochistva,
        yili,
        tashhisi: tashhisiNol,
        tavsiya: tavsiyaNol,
        qaytaKoruv: qaytaKoruvNol
    });

   console.log(newroBemor);
    res.redirect('home');
   
    }catch (err) {
        console.log(err);   
    } 
   
});

router.post('/nevroIstoriya', async (req, res) => {

    try{
        const id = req.body.id;
        const nevroIstor = await Bemor.find().lean();
        const nevroId = await Bemor.findById(id).lean();
        // bemorlarr.forEach(bemorr => {
        //     bemorr.createdAt = moment(bemorr    .createdAt).format('DD-MM-YYYY | HH:mm:ss');
        // });

        if (nevroIstor) {
            nevroIstor.createdAt = moment(nevroIstor.createdAt).format('DD-MM-YYYY | HH:mm:ss');
        } else {
            return res.status(404).send('Bunday bemor topilmadi');
        }

        res.render('nevropatolg', {
            title: 'Nevrapatolg qabul bo`limi',
            nevroIstor: nevroIstor,
            nevroId: nevroId
        })
    } catch (err) {
        console.log('nevroIstorda ERROR ' + err);
        return 
    }
})



module.exports = router;