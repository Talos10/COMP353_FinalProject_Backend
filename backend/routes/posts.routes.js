var express = require('express');
var router = express.Router();
const posts = require("../controllers/posts.controller.js");

// Retrieve all jobs by a user with userID
router.get("/findJobsByUser/:userID", function(req, res, next) {
    posts.findAllJobsByUser(req,res);
});

// Retrieve all posted job by a user with userID
router.get("/findPostedJobsByUser/:userID", function(req, res, next) {
    posts.findAllPostedJobsByUser(req,res);
});

// Retrieve all posted jobs
router.get("/findAllPostedJobs/", function(req, res, next) {
    posts.findAllPostedJobs(req,res);
});

// Update a job's posting status with jobID
router.put("/:jobID", function(req, res, next) {
    posts.updatePosted(req,res);
});

// Retrieve all jobs that are posted and not posted.
router.get("/", function(req, res, next) {
    posts.findAll(req,res);
});

// Retrieve a single job with jobID
router.get("/:jobID", function(req, res, next) {
    posts.findOne(req,res);
});

module.exports = router;
