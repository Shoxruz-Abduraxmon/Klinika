const Router = require('express');

const router = Router();

router.get('/Uzey', (req, res) => {
    res.render('Uzey', {
        title: 'Uzey qabul bo`limi',
        uzeyError: req.flash('uzeyError')
    });
});

router.post('/uzey', (req, res) => {
    const {ism, familya, ochistva, yili} = req.body;

    if(!ism || !familya || !ochistva || !yili) {
        req.flash('uzeyError', 'Barcha qatorlarni to`ldiring !!!');
        res.redirect('Uzey');
        return
    }

    const uzeyBemor = {
        ism: req.body.ism, 
        familya: req.body.familya,
        ochistva: req.body.ochistva,
        yili: req.body.yili
    }

    console.log(uzeyBemor);

    res.redirect('home');
})

module.exports = router;