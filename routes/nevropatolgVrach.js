const Router = require('express');
const Bemor = require('../models/Bemor');

const router = Router();

router.get('/nevropatolgVrach', async (req, res) => {
    const bemorlar = await Bemor.find().lean();

    res.render('nevropatolgVrach', {
        title: 'Vrach nevropatolg',
        bemorlar: bemorlar
    });
})

module.exports = router;