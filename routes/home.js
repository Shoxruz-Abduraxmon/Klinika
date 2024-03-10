const Router = require('express');
const Bemor = require('../models/Bemor');

const router = Router();

router.get('/home', async (req, res) => {

    const bemorlar = await Bemor.find().lean()

    res.render('home', {
        title: 'Klinika',
        newroBemorlar: 'newroBemorlar',
        ortapedBemorlar: 'ortapedBemorlar',
        pediaterBemorlar: 'ortapedBemorlar',
        uzeyBemorlar: 'uzeyBemorlar'
    });
})

router.post('/nevropatolg', (req, res) => {
    res.redirect('nevropatolg');
})
module.exports = router