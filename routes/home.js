const Router = require('express');
const Bemor = require('../models/Bemor');
const Ortaped = require('../models/Ortaped');
const Pediator = require('../models/Pediator');
const Uzey = require('../models/Uzey');

const router = Router();

router.get('/home', async (req, res) => {

    const bemorlar = await Bemor.find().lean();
    const ortopedBemor = await Ortaped.find().lean();
    const pediatorDb = await Pediator.find().lean();
    const modelsUzey = await Uzey.find().lean();

    res.render('home', {
        title: 'Klinika',
        bemorlar: bemorlar,
        ortopedBemor: ortopedBemor,
        pediatorDb: pediatorDb,
        modelsUzey: modelsUzey
    });
})

router.post('/nevropatolg', (req, res) => {
    res.redirect('nevropatolg');
})
module.exports = router