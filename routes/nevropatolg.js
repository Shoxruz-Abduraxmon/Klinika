const Router = require('express');

const router = Router();

router.get('/nevropatolg', (req, res) => {
    res.render('nevropatolg', {
        title: 'Nevrapatolg qabul bo`limi',
        nevropatolgError: req.flash('nevropatolgError')
    });
})

router.post('/nevro', (req, res) => {
   const {ism, familya, ochistva, yili} = req.body;

   if(!ism || !familya || !ochistva || !yili) {
    req.flash('nevropatolgError', 'Barcha qatorlarni to`ldiring !!!')

    res.redirect('nevropatolg');
    return
   }

   const newroBemor = {
    ism: req.body.ism,
    familya: req.body.familya,
    ochistva: req.body.ochistva,
    yili: req.body.yili
   }
    
   console.log(newroBemor);
    res.redirect('home');
});

module.exports = router;