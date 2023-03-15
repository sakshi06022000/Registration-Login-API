const client = require('./connection.js')
const express = require('express')
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send("Hello world");
});

router.get("/all",async (req, res) => {
    const user = await client.query(`select * from users`)
        if (user) {
            res.send(user.rows);
        } else {
            console.log("err", err, "result", result)
        }
    });
   
router.post('/register', async(req, res) => {
    const reg = req.body;
    console.log(reg);
    let insertQuery = client.query(`insert into users(first_name,last_name,mobile_no,email,user_id,password) 
                       values('${reg.first_name}','${reg.last_name}','${reg.mobile_no}','${reg.email}','${reg.user_id}','${reg.password}')`)
    const insert = await insertQuery;
        if (insert) {
            console.log(reg);
            res.send('Insertion was successful')
        }
        else { 
            console.log("err")
         }
    })
  
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { user_id, password } = req.body;
    try {
        const result = await client.query('SELECT * FROM users WHERE user_id = $1 AND password = $2', [user_id, password]);
        console.log(`SELECT * FROM users WHERE user_id ="${user_id}" AND password ="${password}"`);
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
router.delete('/:first_name', async (req, res) => {
    const insertQuery = `delete from users where first_name=${req.params.first_name}`
    const del = await client.query(insertQuery)
    if (del) {
        res.send('Deletion was successful')
    }
    else { console.log(err.message) }
})

module.exports = router;

