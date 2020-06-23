const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1', routes)



app.listen('9000', () => console.log('server up'))