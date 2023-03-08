const client = require('./connection.js')
const express = require('express')
const router = express.Router();

router.get("/all", (req, res, next) => {
    res.status(200).send("Hello world");
});

router.get("/", (req, res) => {
    // res.status(200).send("Hello world");
    client.query(`select * from products`, (err, result) => {
        console.log("err", err, "result", result);
        if (!err) {
            res.send(result.rows);
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    client.query(`Select * from products where id=${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
})

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post('/', (req, res) => {
    const prod = req.body;
    console.log(req.body);
    let insertQuery = `insert into products(id, item_name, price, quantity, image) 
                       values(${prod.id}, '${prod.item_name}', ${prod.price},${prod.quantity},'${prod.image}')`

    client.query(insertQuery, (err, res) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
})

router.put('/:id', (req, res) => {
    console.log(req);
    let prod = req.body;
    const id = req.params.id
    let updateQuery = `update products
                       set item_name = '${prod.name}',
                           price = ${prod.price},
                           quantity = ${prod.quantity},
                           image = '${prod.image}',
                           where id = ${id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
})

router.delete('/:id', (req, res) => {
    let insertQuery = `delete from products where id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
})
// client.end;


module.exports = client;
module.exports = router;