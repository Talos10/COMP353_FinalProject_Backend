var express = require('express');
var router = express.Router();
const applies = require("../controllers/applies.controller.js");

// Apply to a job
router.post("/apply/:userID/:jobID", function(req, res, next) {
    applies.create(req,res);
});

// Retrieve all jobs by a user with userID
router.get("/findJobsByUser/:userID", function(req, res, next) {
    applies.findAllJobsByUser(req,res);
});

// //Offered
// // Retrieve all offered jobs for a user with userID
// router.get("/findOfferedJobsByUser/:userID", function(req, res, next) {
//     applies.findAllOfferedJobsByUser(req,res);
// });

// //Accepted
// // Retrieve all posted job by a user with userID
// router.get("/findPostedJobsByUser/:userID", function(req, res, next) {
//     applies.findAllPostedJobsByUser(req,res);
// });

// //Offered
// // Retrieve all posted jobs
// router.get("/findAllPostedJobs/", function(req, res, next) {
//     applies.findAllPostedJobs(req,res);
// });

// //Accepted
// // Retrieve all posted jobs
// router.get("/findAllPostedJobs/", function(req, res, next) {
//     applies.findAllPostedJobs(req,res);
// });

// //Offered
// // Update a job's post status with jobID
// router.put("/:jobID", function(req, res, next) {
//     applies.updatePosted(req,res);
// });

// //Accepted
// // Update a job's posting status with jobID
// router.put("/:jobID", function(req, res, next) {
//     applies.updatePosted(req,res);
// });

//
// Withdraw application
router.delete("/withdraw/:userID/:jobID", function(req, res, next) {
    applies.withdraw(req,res);
});

// Retrieve all jobs
router.get("/", function(req, res, next) {
    applies.findAll(req,res);
});

// // Retrieve a single job with jobID
// router.get("/:jobID", function(req, res, next) {
//     applies.findOne(req,res);
// });

module.exports = router;
