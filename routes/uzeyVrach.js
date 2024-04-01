const Router = require('express');
const Uzey = require('../models/Uzey');
const moment = require('moment'); 

const router = Router();

router.get('/uzeyVrach', async (req, res) => {

    const uzeyBemor = await Uzey.find().lean();

    res.render('uzeyVrach', {
        title: 'Uzey Vrach',
        issUzey: true,
        uzeyBemor: uzeyBemor
    });
});

router.post('/uzeyQabul', async (req, res) => {

    const id = req.body.id;
    const uzeyBemor = await Uzey.find().lean();
    const uzeyId = await Uzey.findById(id).lean();

    if(uzeyId) {
        uzeyId.createdAt = moment(uzeyId.createdAt).format('DD-MM-YYYY | HH:mm:ss');
    } else {
        return res.status(404).send('Bunday bemor topilmadi');
    }

    res.render('uzeyVrach', {
        title: 'Uzey Vrach',
        issUzey: true,
        uzeyBemor: uzeyBemor,
        uzeyId: uzeyId
    });
});



// router.post('/uzeyEdit/:id', async (req, res) => {
    
//     const id = req.params.id;
//     const {ism, familya, ochistva, yili, tashhisi, tavsiya, qaytaKoruv} = req.body;

//     const uzeyBemor = await Uzey.find().lean();
//     const uzeyId = await Uzey.findById(id).lean();


//     const bemorQabul = await Uzey.findByIdAndUpdate(id, req.body, {new: true});
    
//     // console.log(uzeyCreate);
//     console.log(bemorQabul);
//     res.render('uzeyVrach', {
//         title: 'Uzey Vrach',
//         issUzey: true,
//         uzeyBemor: uzeyBemor,
//         uzeyId: uzeyId,
//         bemorQabul: bemorQabul,
        
//     });

// });

router.post('/uzeyEdit/:id', async (req, res) => {
    const id = req.params.id;
    const { tashhisi, tavsiya, qaytaKoruv } = req.body;

    try {
        const updatedUzey = await Uzey.findByIdAndUpdate(id, {
            tashhisi: tashhisi,
            tavsiya: tavsiya,
            qaytaKoruv: qaytaKoruv
        }, { new: true });

        console.log(updatedUzey);
        res.render('uzeyVrach', {
            title: 'Uzey Vrach',
            issUzey: true
        }); 

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router; 