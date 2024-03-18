const Router = require('express');
const Ortaped = require('../models/Ortaped');

const router = Router();

router.get('/Ortaped', (req, res) => {
    res.render('Ortaped', {
        title: 'Ortaped qabul bo`limi',
        ortapedError: req.flash('ortapedError')
    });
});


router.post('/ortaped', async (req, res) => {
    const {ism, familya, ochistva, yili} = req.body;

     if(!ism || !familya || !ochistva || !yili) {
        req.flash('ortapedError', 'Barcha qatorni to`ldiring !!!')
        res.redirect('Ortaped');
        return
    }
    
    try{

    const ortaped = await Ortaped.create(req.body);    


    console.log(ortaped);
    res.redirect('home')
    
}catch (err) {
    console.log(err);
} 
})

module.exports = router;