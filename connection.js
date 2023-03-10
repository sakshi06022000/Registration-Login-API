const {Client} = require('pg');

const client = new Client({
    host : "localhost",
    user: "postgres",
    port: 5432,
    password: "123",
    database: "Reg"
})

client.connect(function(err){
    console.log("connection done");
    if(err){
        console.log("Not Connected");
    }
})

module.exports = client;