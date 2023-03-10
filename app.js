const client = require('./connection.js');
const express = require('express');
const app = express();
const port = 3003;
const hostname = "localhost";

const user = require('./user.js')
const file = require('./file.js');
const product = require('./product.js')

app.use('/user',user)
app.use('/file',file)
app.use('/product',product)

app.listen(port,hostname,(err)=>{
    if(err){
        console.log("err",err);
    }else
    console.log(`Server is working on port: http://${hostname}:${port}`)
});

