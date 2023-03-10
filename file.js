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




// const storage = multer.memoryStorage()
// const upload = multer({ storage });

// router.post('/uploads', upload.single('file'), async (req, res) => {
//   const { originalname, buffer } = req.file;

//   try {
//     // insert the file into the database
//     await client.query('INSERT INTO files (name, content) VALUES ($1, $2)', [originalname, buffer]);

//     res.send('File uploaded successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Failed to upload file');
//   }
// });


// router.get('/files/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // query the file from the database
//     const result = await client.query('SELECT name, content FROM files WHERE id = $1', [id]);

//     // return the file as a response
//     res.set('Content-Type', 'application/octet-stream');
//     res.set('Content-Disposition', `attachment; filename="${result.rows[0].name}"`);
//     res.send(result.rows[0].content);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Failed to retrieve file');
//   }
// });


module.exports = router;
// const singleUpload = multer({ storage: storage }).single('file');
// const multipleUpload = multer({ storage: storage }).array('files', 10); 

// Define a route for file upload
// router.post('/upload', function (req, res) {
//   const isSingleUpload = (req.body.uploadType === 'single');
//   const upload = isSingleUpload ? singleUpload : multipleUpload;
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       res.status(400).send({ error: "Please upload file"});
//     } else if (err) {
//       res.status(500).send({ error: "please" });
//     } else {
//       const dirname = path.resolve();
//       const filepaths = isSingleUpload ? [req.file.path] : req.files.map(file => file.path);
//       res.send({ dirname, filepaths });
//     }
//   });
// });




// router.post('/uploadfile', upload.single('file'), (req, res) => {
//   // const file = req.file;
//   if (!req.file) {
//     const err = new Error('Please upload a file')
//     err.httpStatusCode = 400
//     return next(err)
//   }
//   res.send(req.file);
// })

// router.post('/uploadfiles', upload.array('file', 3), (req, res) => {
//   const files = req.files;
//   if (!files) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   } else {
//     res.send(files);
//   }
// });
// router.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     const fileUrl = `${__filename}`;
//     return res.status(200).json({ url:fileUrl });
// });

// router.post('/uploads', upload.single('file'), (req, res) => {
// const upload = async (req, res) => {
//     try {
//       await uploadFile(req, res);
//       if (req.file == undefined) {
//         return res.status(400).send({ message: "Upload a file please!" });
//       }
//       res.status(200).send({
//         message: "The following file was uploaded successfully: " + req.file.originalname,
//       });
//     } catch (err) { 
//         // \\ error handling
//       res.status(500).send({
//         message: `Unable to upload the file: ${req.file.originalname}. ${err}`,
//       });
//     }
//   };

// });




// const upload = multer({ storage: storage }).array('files', 10); // allow up to 10 files to be uploaded at once

// // Define a route for file upload
// app.post('/upload', function(req, res) {
//   // Call the multer middleware to handle the file upload
//   upload(req, res, function(err) {
//     if (err instanceof multer.MulterError) {
//       res.status(400).send({ error: err.message });
//     } else if (err) {
//       res.status(500).send({ error: err.message });
//     } else {
//       // Send back the directory names and paths of the uploaded files
//       const dirname = path.resolve();
//       const filepaths = req.files.map(file => file.path);
//       res.send({ dirname, filepaths });
//     }
//   });
// });
