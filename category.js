const client = require('./connection.js')
const express = require('express')
const router = express.Router();

router.get('/', async (req, res) => {
  const cat = await client.query('SELECT * FROM categories')
  if (!cat) {
    res.status(500).send(error);
  } else {
    res.send(cat.rows);
  }
});

// getby id
async function getDataById(id) {
  try {
      var cat = await client.query(`SELECT * FROM categories where categoryid = $1`, [id]);
      cat = cat.rows[0];
      console.log(cat);
      var parentCategory = {}
      if (cat.parentid !== null) {
          parentCategory = await getDataById(cat.parentid)
          cat.parentCategory = parentCategory;
      }
      return cat;
  }
  catch (err) {
      console.log(err.message);
  }
}

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const data = await getDataById(id)
      if (!data) {
          return res.status(404).send('Data not found');
      }
      res.send(data);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

const bodyParser = require('body-parser');
router.use(bodyParser.json());
//insert api
router.post('/', async (req, res) => {
  const cat = req.body;
  const category1 = `insert into categories(categoryid, categoryname, code, parentid) 
                       values(${cat.categoryid}, '${cat.categoryname}', '${cat.code}', ${cat.parentid})`
  const category = await client.query(category1)
  if (category) {
    console.log(cat);
    res.send(cat);
  }
  else {
    console.log("err");
  }
})


//update api
router.put('/:id', async (req, res) => {
  let cat = req.body;
  const id = req.params.id;
  let updateQuery = client.query(`update categories
                                  set categoryname = '${cat.categoryname}',
                                      code = '${cat.code}',
                                      parentid = ${cat.parentid}
                                      where categoryid = ${id}`);
  const update = await updateQuery
  if (update) {
    res.send('Update was successful')
  }
  else {
    console.log("err")
  }
})


//delete api
router.delete('/:id', async (req, res) => {
  const dele = `delete from categories where categoryid=${req.params.id}`;
  const del = await client.query(dele)
  if (del) {
    res.send('Deletion was successful')
  }
  else { console.log(err.message) }
})

module.exports = client;
module.exports = router;