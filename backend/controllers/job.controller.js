const Job = require("../models/job.model.js");

// Create and Save a new job
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a job
    const job = new Job({
      title: req.body.title,
      nbrOfApplications: req.body.nbrOfApplications,
      nbrOfPositionsFilled: req.body.nbrOfPositionsFilled,
      description: req.body.description,
      nbrOfPositionsAvailable: req.body.nbrOfPositionsAvailable,
      datePosted: req.body.datePosted
    });
  
    // Save job in the database
    Job.create(job, req.params.userID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the job."
        });
      else res.send(data);
    });
  };

// Retrieve all jobs from the database.
exports.findAll = (req, res) => {
    Job.getAll(req.query.title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jobs."
        });
      else res.send(data);
    });
};

// Find a single job with a jobID
exports.findOne = (req, res) => {
    Job.findById(req.params.jobID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found job with jobID ${req.params.jobID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving job with jobID " + req.params.jobID
          });
        }
      } else res.send(data);
    });
  };

// Update a job identified by the jobID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Job.updateById(
      req.params.jobID,
      new Job(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found job with jobID ${req.params.jobID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating job with jobID " + req.params.jobID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a job with the specified jobID in the request
exports.delete = (req, res) => {
    Job.remove(req.params.jobID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found job with jobID ${req.params.jobID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete job with jobID " + req.params.jobID
          });
        }
      } else res.send({ message: `Job was deleted successfully!` });
    });
  };

// Delete all jobs from the database.
exports.deleteAll = (req, res) => {
    Job.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all jobs."
        });
      else res.send({ message: `All jobs were deleted successfully!` });
    });
  };