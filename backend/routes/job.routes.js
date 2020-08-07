module.exports = app => {

    console.log("In here");

    const jobs = require("../controllers/job.controller.js");
  
    var router = require("express").Router();
  
    // Create a new job
    router.post("/", jobs.create);
  
    // Retrieve all jobs
    router.get("/", jobs.findAll);
  
    // Retrieve all published jobs
    router.get("/published", jobs.findAllPublished);
  
    // Retrieve a single job with id
    router.get("/:id", jobs.findOne);
  
    // Update a job with id
    router.put("/:id", jobs.update);
  
    // Delete a job with id
    router.delete("/:id", jobs.delete);
  
    // Delete all jobs
    router.delete("/", jobs.deleteAll);
  
    app.use('/api/jobs', router);
  };