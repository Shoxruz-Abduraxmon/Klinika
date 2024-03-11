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
    const {ism, familya, ochistva, yili} = req.body;

    if(!ism || !familya || !ochistva || !yili) {
        req.flash('uzeyError', 'Barcha qatorlarni to`ldiring !!!');
        res.redirect('Uzey');
        return
    }

    // const uzeyBemor = {
    //     ism: req.body.ism, 
    //     familya: req.body.familya,
    //     ochistva: req.body.ochistva,
    //     yili: req.body.yili
    // }
    try{
    const uzeydb = await Uzey.create(req.body);
    console.log(uzeydb);

    res.redirect('home');
    
}catch (err) {
    console.log(err);
}
    
})

module.exports = router;