const Router = require('express');
const Pediator = require('../models/Pediator');
const moment = require('moment');

const router = Router();

router.get('/pediatorVrach', async (req, res) => {

    try{
    
        const pediatorBemor = await Pediator.find().lean();

        res.render('pediatorVrach', {
            title: 'Pediator Vrach',
            pediatorBemor: pediatorBemor,
            issPediator: true
        })

    } catch (err) {
        console.log('Pediator Vrach get ERROR' + err);
        res.status(404).send(err);
    }

    router.post('/pediatorQabul', async (req, res) => {

        const id = req.body.id;

        try{
            const pediatorBemor = await Pediator.find().lean();
            const pediatorId = await Pediator.findById(id).lean();

            if(pediatorId) {
                pediatorId.createdAt = moment(pediatorId.createdAt).format('DD-MM-YYYY | HH:mm:ss');
            } else {
                return console.log('Bunday bemor topilmadi !!!')
            }

            res.render('pediatorVrach', {
                title: 'Pediator Vrach',
                pediatorBemor: pediatorBemor, 
                pediatorId: pediatorId,
                issPediator: true
            })

        } catch (err) {
            console.log('Pediator Vrach post ' + err);
            res.status(501).send(err)
        }
    })
    
});

router.post('/pediaterEdit/:id', async (req, res) => {
    const id = req.params.id;
    const { tashhisi, tavsiya, qaytaKoruv } = req.body;
    const pediatorBemor = await Pediator.find().lean();

    try{
        const pediatorEditBemor = await Pediator.findByIdAndUpdate(id, {
            tashhisi: tashhisi, 
            tavsiya: tavsiya,
            qaytaKoruv: qaytaKoruv
        }, {new : true});
        console.log(pediatorEditBemor);
        res.render('pediatorVrach', {
            pediatorBemor: pediatorBemor,
            issPediator: true   
        });
    } catch (e) {
        console.log("Pediator Editda ERROR " + e);
    }
});


module.exports = router;