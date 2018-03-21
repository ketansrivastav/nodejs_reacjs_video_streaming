const express = require('express');
const exphbs = require('express-handlebars');
const indexRoute = require('./routes/index');
const apiRpute = require('./routes/api');
const {www,express_views} = require('../bin/config/paths')

const port = 8000;

const path= require('path')

const app = express();
app.engine('hbs',exphbs({ extname: '.hbs'}));
app.set('views',express_views);
app.set('view engine','hbs');




app.use('/',indexRoute);
app.use('/api',apiRpute);


app.use(express.static(www))


app.listen(port,()=>{console.log(`server started ${port}`);});