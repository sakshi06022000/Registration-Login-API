const client = require('./connection.js');
const express = require('express');
const app = express();
const port = 3003;
const hostname = "localhost";
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });


const user = require('./user.js')
const file = require('./file.js');
const product = require('./product.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json());


app.use('/user',user)
app.use('/file',file)
app.use('/product',product)
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port,hostname,()=>{
    console.log(`Server is working on port: http://${hostname}:${port}`)
});

client.connect();
