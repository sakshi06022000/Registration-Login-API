const client = require('./connection.js')
const express = require('express')
const router = express.Router();

router.get("/all", (req, res, next) => {
    res.status(200).send("Hello world");
});

router.get("/", async (req, res) => {
    const prod = await client.query(`select * from products`)
    console.log(prod.rows);
    res.send(prod.rows)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await client.query(`Select * from products where id=${id}`)
    if (user) {
        res.send(user.rows);
    }
});

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.post('/', async (req, res) => {
    const prod = req.body;
    let insertQuery = `insert into products(id, item_name, price, quantity, image) 
                       values(${prod.id}, '${prod.item_name}', ${prod.price},${prod.quantity},'${prod.image}')`
    const users = await client.query(insertQuery)
    if (users) {
        console.log(prod);
        res.send(prod)
    }
    else {
        console.log("err");
    }
})


router.put('/:id', async (req, res) => {
    let prod = req.body;
    const id = req.params.id
    let updateQuery = client.query(`update products
                       set item_name = '${prod.item_name}',
                           price = ${prod.price},
                           quantity = ${prod.quantity},
                           image = '${prod.image}'
                           where id = ${id}`);
    const update = await updateQuery
    if (update) {
        res.send('Update was successful')
    }
    else {
        console.log("err")
    }
})

router.delete('/:id', async (req, res) => {
    const insertQuery = `delete from products where id=${req.params.id}`
    const del = await client.query(insertQuery)
    if (del) {
        res.send('Deletion was successful')
    }
    else { console.log(err.message) }
})

module.exports = client;
module.exports = router;