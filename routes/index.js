var code = require('../codebreaker/codeBreaker')
var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  code.secretNumber(req.query.number, (result)=>{
    res.json({
      type: result.type,
      message: result.message
    })
  })
});
router.post('/write', function(req, res, next) {
  if(req.body.token==='aD12AS4Sd'){
    code.setSecretNumber(req.body.number, (result)=>{
      res.json({
        type: result.type,
        message: result.message
      })
    })
  } else{
    res.json({type:0, message:'Wrong token'})
  }
});
module.exports = router;
