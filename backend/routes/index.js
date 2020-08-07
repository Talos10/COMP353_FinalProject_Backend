var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// simple route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend of our Comp 353 website." });
});

module.exports = router;
