const express= require('express');
const router = express.Router();
const path = require('path');

router.get('/',function(req,res,next){
    res.status(200).sendFile(path.join('../build/index.html'));
});


module.exports = router;

