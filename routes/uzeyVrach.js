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
})


module.exports = router; 