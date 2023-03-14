const client = require('./connection.js')
const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Users/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const upload = multer({ storage: storage });

router.post('/upload', upload.array('file', 4),  function (req, res, next) {
  const dirname = path.resolve();
  console.log('log', req.files);
  let filepath = [];
  req.files.forEach((item) => { filepath.push(item.path) });
  console.log("filepath", filepath);
  if (!req.files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({ dirname, filepath });
});

module.exports = router;
