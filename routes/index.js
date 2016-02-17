var express = require('express');
var router = express.Router();
var NewUrl=require('../UrlModels/url.js')
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'index',
        user: req.session.user
    });
});
router.get('/showi', function (req, res) {
    res.render('index', { title: 'Express' });

});
router.post('/', function (req, res) {
    console.log(req.body.inputSite)
    var newurl = new NewUrl({
        user:req.session.user ,
        url:req.body.inputSite,
        content:"这里是自定义内容"
    })
    newurl.create(function(err,doc){newurl.insert(doc,function(err,shorturl){
          console.log(shorturl);
    })});
    res.render('index', {
        title: 'index',
        user:req.session.user
    });
});

module.exports = router;