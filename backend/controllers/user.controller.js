const User = require("../models/user.model.js");

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    const user = new User({
      userType: req.body.userType,
      email: req.body.email,
      membership: req.body.membership,
      password: req.body.password,
      accountBalance: req.body.accountBalance,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accountStatus: req.body.accountStatus,
      isFrozen: req.body.isFrozen
    });
  
    // Save user in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      else res.send(data);
    });
  };

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };

// Find a single user with a userID
exports.findOne = (req, res) => {
    User.findById(req.params.userID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with userID ${req.params.userID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with userID " + req.params.userID
          });
        }
      } else res.send(data);
    });
  };

  // Find a single user with a email and password
exports.findOneAuth = (req, res) => {
  User.findByIdAuth(req.params.email, req.params.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Login info not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving login info."
        });
      }
    } else res.send(data);
  });
};

// Update a user identified by the userID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.updateById(
      req.params.userID,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with userID ${req.params.userID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating user with userID " + req.params.userID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a user with the specified userID in the request
exports.delete = (req, res) => {
    User.remove(req.params.userID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with userID ${req.params.userID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with userID " + req.params.userID
          });
        }
      } else res.send({ message: `user was deleted successfully!` });
    });
  };

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      else res.send({ message: `All users were deleted successfully!` });
    });
  };