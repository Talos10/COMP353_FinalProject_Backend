const Applies = require("../models/applies.model.js");

// Create and Save a new applied job
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a new applied job
    const applies = new Applies({
      isOffered: 0,
      userID: req.params.userID,
      jobID: req.params.jobID,
      isAccepted: 0
    });
  
    // Save posted job in the database
    Applies.create(applies, (err, data) => {
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
  Applies.getAll((err, data) => {
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
    Applies.getAllJobsByUser(req.params.userID, (err, data) => {
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


// Retrieve all jobs by a user from the database.
exports.withdraw = (req, res) => {
  Applies.withdrawApplication(req.params.userID, req.params.jobID, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No match found with userID ${req.params.userID} and jobID ${req.params.jobID}.`
            });
          } else {
            res.status(500).send({
              message: "Error finding job with jobID " + req.params.jobID + " and with userID " + req.params.userID
            });
          }
        } else res.send({ message: "Deleted application of user with userID " + req.params.userID + " for jobID " + req.params.jobID });
  });
};


// // Retrieve all posted jobs by a user from the database.
// exports.findAllPostedJobsByUser = (req, res) => {
//     Posts.getAllPostedJobsByUser(req.params.userID, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//               res.status(404).send({
//                 message: `No posted jobs found with userID ${req.params.userID}.`
//               });
//             } else {
//               res.status(500).send({
//                 message: "Error retrieving posted jobs with userID " + req.params.userID
//               });
//             }
//           } else res.send(data);
//     });
// };

// // Retrieve all posted jobs from the database.
// exports.findAllPostedJobs = (req, res) => {
//     Posts.getAllPostedJobs((err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//               res.status(404).send({
//                 message: `No posted jobs found.`
//               });
//             } else {
//               res.status(500).send({
//                 message: "Error retrieving posted jobs."
//               });
//             }
//           } else res.send(data);
//     });
// };

// // Find a single job with a jobID
// exports.findOne = (req, res) => {
//     Posts.findById(req.params.jobID, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Job not found with jobID ${req.params.jobID}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error retrieving job with jobID " + req.params.jobID
//           });
//         }
//       } else res.send(data);
//     });
//   };

// // Update a job identified by the jobID in the request
// exports.updatePosted = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//     }
  
//     Posts.updatePostedById(
//       req.params.jobID,
//       req.body.isPosted,
//       (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Job not found with jobID ${req.params.jobID}.`
//             });
//           } else {
//             res.status(500).send({
//               message: "Error updating job with jobID " + req.params.jobID
//             });
//           }
//         } else res.send(data);
//       }
//     );
//   };
