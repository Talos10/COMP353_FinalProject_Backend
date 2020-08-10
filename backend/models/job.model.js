const sql = require("./db.js");
const Posts = require("../models/posts.model.js");

// constructor
const Job = function(job) {
  this.title = job.title;
  this.nbrOfApplications = job.nbrOfApplications;
  this.nbrOfPositionsFilled = job.nbrOfPositionsFilled;
  this.description = job.description;
  this.nbrOfPositionsAvailable = job.nbrOfPositionsAvailable;
  this.datePosted = job.datePosted;
};

Job.create = (newJob, userID, result) => {
  sql.query("INSERT INTO job SET ?", newJob, (err, res) => {

    // Create a new posted job
    const posts = new Posts({
      isPosted: 0,
      userID: userID,
      jobID: res.insertId
    });

    // Save posted job in the database
    Posts.create(posts, (err, data) => {
    });

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created job: ", { id: res.insertId, ...newJob });
    result(null, { id: res.insertId, ...newJob });
  });
};

Job.getAll = (title, result) => {

  if (title != null) {
    sql.query("SELECT * FROM job WHERE title = ?", title, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("job: ", res);
      result(null, res);
    });
  }
  else {
    sql.query("SELECT * FROM job", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("job: ", res);
      result(null, res);
    });
  }
  
};

Job.findById = (jobID, result) => {
  sql.query(`SELECT * FROM job WHERE jobID = ${jobID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found job: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found job with the jobID
    result({ kind: "not_found" }, null);
  });
};

Job.updateById = (jobID, job, result) => {
  sql.query(
    "UPDATE job SET title = ?, nbrOfApplications = ?, nbrOfPositionsFilled = ?, description = ?, nbrOfPositionsAvailable = ?, datePosted = ? WHERE jobID = ?",
    [job.title, job.nbrOfApplications, job.nbrOfPositionsFilled, job.description, job.nbrOfPositionsAvailable, job.datePosted, jobID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found job with the jobID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated job: ", { jobID: jobID, ...job });
      result(null, { jobID: jobID, ...job });
    }
  );
};

Job.remove = (jobID, result) => {

  sql.query("DELETE FROM posts WHERE jobID = " + Number(jobID));

  sql.query("DELETE FROM job WHERE jobID = ?", Number(jobID), (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found job with the jobID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted job with jobID: ", jobID);
    result(null, res);
  });
};

Job.removeAll = result => {

  sql.query("DELETE FROM posts");

  sql.query("DELETE FROM job", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} jobs`);
    result(null, res);
  });

  sql.query("ALTER TABLE job AUTO_INCREMENT = 1");
};

module.exports = Job;
