var express = require('express');

var router = express.Router();

router.get('/',function(req,res,next){
    res.send('respond with a resources');
})

module.exports = router