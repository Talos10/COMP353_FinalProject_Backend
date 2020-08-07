const db = require("../models/indexSQL");
const Job = db.jobs;
const Op = db.Sequelize.Op;

// Create and Save a new Job
exports.create = (req, res) => {

};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {

};

// Find a single Job with an id
exports.findOne = (req, res) => {

};

// Update a Job by the id in the request
exports.update = (req, res) => {

};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Jobs
exports.findAllPublished = (req, res) => {

};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Job
    const job = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Job in the database
    Job.create(job)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the job."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Job.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Job.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving job with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Job.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update job with id=${id}. Maybe job was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating job with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Job.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete job with id=${id}. Maybe job was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete job with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Job.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} jobs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all jobs."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Job.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs."
            });
        });
};
