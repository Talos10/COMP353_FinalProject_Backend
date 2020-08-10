var express = require('express');
var router = express.Router();
const user = require("../controllers/user.controller.js");

// Create a new user
router.post("/", function(req, res, next) {
  user.create(req,res);
});

// Retrieve all users
router.get("/", function(req, res, next) {
  user.findAll(req,res);
});

// Retrieve a single user with userID
router.get("/:userID", function(req, res, next) {
  user.findOne(req,res);
});

// Retrieve a single user with email and password
router.get("/auth/:email/:password", function(req, res, next) {
  user.findOneAuth(req,res);
});

// Update a user with userID
router.put("/:userID", function(req, res, next) {
  user.update(req,res);
});

// Delete a user with userID
router.delete("/:userID", function(req, res, next) {
  user.delete(req,res);
});

// Delete all users
router.delete("/", function(req, res, next) {
  user.deleteAll(req,res);
});

module.exports = router;
