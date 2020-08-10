var express = require('express');
var router = express.Router();
const job = require("../controllers/job.controller.js");

// Create a new job
router.post("/:userID", function(req, res, next) {
  job.create(req,res);
});

// Retrieve all jobs
router.get("/", function(req, res, next) {
  job.findAll(req,res);
});

// Retrieve a single job with jobID
router.get("/:jobID", function(req, res, next) {
  job.findOne(req,res);
});

// Update a job with jobID
router.put("/:jobID", function(req, res, next) {
  job.update(req,res);
});

// Delete a job with jobID
router.delete("/:jobID", function(req, res, next) {
  job.delete(req,res);
});

// Delete all jobs
router.delete("/", function(req, res, next) {
  job.deleteAll(req,res);
});

module.exports = router;
