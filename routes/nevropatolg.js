const Router = require('express');
const Bemor = require('../models/Bemor');

const router = Router();

router.get('/nevropatolg', (req, res) => {
    res.render('nevropatolg', {
        title: 'Nevrapatolg qabul bo`limi',
        bemorlar: 'bemorlar',
        nevropatolgError: req.flash('nevropatolgError')
    });
})

router.post('/nevro', async (req, res) => {
   const {ism, familya, ochistva, yili} = req.body;

   if(!ism || !familya || !ochistva || !yili) {
    req.flash('nevropatolgError', 'Barcha qatorlarni to`ldiring !!!')

    res.redirect('nevropatolg');
    return
   }


//    const bemorlar = {
//     ism: req.body.ism,
//     familya: req.body.familya,
//     ochistva: req.body.ochistva,
//     yili: req.body.yili
//    }
    
   try{
    const newroBemor = Bemor.create(req.body);

   console.log(newroBemor);
    res.redirect('home');
   
    }catch (err) {
        console.log(err);   
    } 
   
});

module.exports = router;