var express = require('express');
var router = express.Router();
var urldb=require('../db/url_schema').urllist;
/* GET users listing. */
router.get('/:urlcode', function (req, res){
     var urlshow=req.params.urlcode;

    urldb.find({shorturlcode:urlshow},function(err,doc){
        res.writeHead(302, {
            'Location': doc.url
            //add other headers here...
        });
        res.end();
    })
});

module.exports = router;