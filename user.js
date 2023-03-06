const client = require('./connection.js')
const express = require('express')
const router= express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send("Hello world");
});

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post('/register',(req,res)=>{
    const reg = req.body;
    let insertQuery = `insert into user5(first_name,last_name,mobile_no,email,user_id,password) 
                       values('${reg.first_name}','${reg.last_name}','${reg.mobile_no}','${reg.email}','${reg.user_id}','${reg.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const { user_id, password } = req.body;
    try {
        const result = await client.query('SELECT * FROM user5 WHERE user_id = $1 AND password = $2', [user_id, password]);
        console.log(`SELECT * FROM user5 WHERE user_id ="${user_id}" AND password ="${password}"`);
        // const result = await Pool.query(`SELECT * FROM users WHERE user_id =${user_id} AND password =${password}`);
        if (result.rows.length === 0) {
            res.status(401).json({ success: false, message: 'Invalid user_id or password' });
        } else {
            const first_name = result.rows[0].first_name;

            const last_name = result.rows[0].last_name;
            const mobile_no = result.rows[0].mobile_no;

            const email_id = result.rows[0].email_id;
            res.status(200).json({ success: true, first_name, last_name, mobile_no, email_id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while logging in' });
    }
});

client.end();
module.exports = router;

