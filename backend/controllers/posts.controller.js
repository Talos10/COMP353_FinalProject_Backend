const Posts = require("../models/posts.model.js");

// Create and Save a new posted job
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a new posted job
    const posts = new Posts({
      isPosted: req.body.isPosted,
      userID: req.body.userID,
      jobID: req.body.jobID
    });
  
    // Save posted job in the database
    Posts.create(posts, (err, data) => {
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
    Posts.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        else res.send(data);
    });
};

// Retrieve all jobs by a user from the database.
exports.findAllJobsByUser = (req, res) => {
    Posts.getAllJobsByUser(req.params.userID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No jobs found with userID ${req.params.userID}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving jobs with userID " + req.params.userID
              });
            }
          } else res.send(data);
    });
};

// Retrieve all posted jobs by a user from the database.
exports.findAllPostedJobsByUser = (req, res) => {
    Posts.getAllPostedJobsByUser(req.params.userID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No posted jobs found with userID ${req.params.userID}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving posted jobs with userID " + req.params.userID
              });
            }
          } else res.send(data);
    });
};

// Retrieve all posted jobs from the database.
exports.findAllPostedJobs = (req, res) => {
    Posts.getAllPostedJobs((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No posted jobs found.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving posted jobs."
              });
            }
          } else res.send(data);
    });
};

// Find a single job with a jobID
exports.findOne = (req, res) => {
    Posts.findById(req.params.jobID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Job not found with jobID ${req.params.jobID}.`
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
exports.updatePosted = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Posts.updatePostedById(
      req.params.jobID,
      req.body.isPosted,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Job not found with jobID ${req.params.jobID}.`
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
    Posts.remove(req.params.jobID, (err, data) => {
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

// // Delete all jobs from the database.
// exports.deleteAll = (req, res) => {
//     Job.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all jobs."
//         });
//       else res.send({ message: `All jobs were deleted successfully!` });
//     });
//   };