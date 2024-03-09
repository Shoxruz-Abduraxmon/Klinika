const Router = require('express');

const router = Router();

router.get('/Ortaped', (req, res) => {
    res.render('Ortaped', {
        title: 'Ortaped qabul bo`limi',
        ortapedError: req.flash('ortapedError')
    });
});


router.post('/ortaped', async (req, res) => {
    const {ism, familya, ochistva, yili} = req.body;

    try{

     if(!ism || !familya || !ochistva || !yili) {
        req.flash('ortapedError', 'Barcha qatorni to`ldiring !!!')
        res.redirect('Ortaped');
        return
    }
    
    const ortapedBemor = {
        ism: req.body.ism,
        familya: req.body.familya,
        ochistva: req.body.ochistva,
        yili: req.body.yili
    }

    console.log(ortapedBemor);
    res.redirect('home')
    
}catch (err) {
    console.log(err);
} 
})

module.exports = router;