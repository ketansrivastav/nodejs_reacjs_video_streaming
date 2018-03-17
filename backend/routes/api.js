const express = require('express');
const route = express.Router() ;

route.get('/',(req,res)=>{
    res.send('hello api')
})


module.exports = route;