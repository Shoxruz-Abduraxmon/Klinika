const Router = require('express');
const Ortaped = require('../models/Ortaped');
const moment = require('moment');

const router = Router();

router.get('/ortapedQabul', async (req, res) => {

    try{
    const ortapedBemor = await Ortaped.find().lean();
    
    res.render('ortapedVrach', {
        title: 'Ortaped Vrach',
        ortapedBemor: ortapedBemor,
        issOrtaped: true
    })

    } catch (err) {
        console.log('Ortaped Vrach ERROR' + err);
        res.status(500).send(err);
    }
});

router.post('/ortapedQabul', async (req, res) => {
    const id = req.body.id

    try{
        const ortapedBemor = await Ortaped.find().lean();
        const ortapedId = await Ortaped.findById(id).lean();

        ortapedBemor.forEach(bemor => {
            bemor.createdAt = moment(bemor.createdAt).format('DD-MM-YYYY | HH:mm:ss');
        });

        if(ortapedId) {
            ortapedId.createdAt = moment(ortapedId.createdAt).format('DD-MM-YYYY | HH:mm:ss');
        }else{
            return res.status(404).send('Bunday bemor topilmadi !!!');
        }

        res.render('ortapedVrach', {
            title: 'Ortaped Vrach',
            ortapedBemor: ortapedBemor, 
            ortapedId: ortapedId,
            issOrtaped: true 
        });
    } catch (err) {
        console.log('Ortaped Vrach Post ERROR' + err);
        res.status(500).send(err);
    }
    
})


module.exports = router;