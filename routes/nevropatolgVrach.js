const Router = require('express');
const Bemor = require('../models/Bemor');
const moment = require('moment'); 

const router = Router();

router.get('/nevropatolgVrach', async (req, res) => {
    try {
        const bemorlar = await Bemor.find().lean();

        res.render('nevropatolgVrach', {
            title: 'Vrach nevropatolg',
            bemorlar: bemorlar,
            issNevro: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/bermorQabul', async (req, res) => {
    const id = req.body.id;

    try {
        const bemorlar = await Bemor.find().lean();
        const BemorId = await Bemor.findById(id).lean();

      for(let i = 0; i < bemorlar.length; i ++) {
        await Bemor.findByIdAndUpdate(bemorlar[i]._id);
      }

        bemorlar.forEach(bemor => {
            bemor.createdAt = moment(bemor.createdAt).format('DD-MM-YYYY | HH:mm:ss');
        });

        if (BemorId) {
            BemorId.createdAt = moment(BemorId.createdAt).format('DD-MM-YYYY | HH:mm:ss');
        } else {
            return res.status(404).send('Bunday bemor topilmadi');
        }


        res.render('nevropatolgVrach', {
            title: 'Vrach nevropatolg',
            bemorlar: bemorlar,
            BemorId: BemorId,
            issNevro: true,
        });
    } catch (err) {
        console.log(`NevropatolgVrach.js da ERROR:` + err);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;

    const { tashhisi, tavsiya, qaytaKoruv } = req.body;

    const bemorlar = await Bemor.find().lean();

    try {
        const nevroEditGet = await Bemor.findByIdAndUpdate(id, {
            tashhisi: tashhisi,
            tavsiya: tavsiya,
            qaytaKoruv: qaytaKoruv
        }, { new: true });

        console.log(nevroEditGet);
        res.render('nevropatolgVrach', {
            title: 'Vrach nevropatolg',
            bemorlar: bemorlar,
            issNevro: true,
        });

    } catch (e) {
        console.log("NevroEditda ERROR" + e)
    }
})


module.exports = router;
