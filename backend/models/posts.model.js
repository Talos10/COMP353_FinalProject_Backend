const sql = require("./db.js");

// constructor
const Posts = function(posts) {
  this.isPosted = posts.isPosted;
  this.userID = posts.userID;
  this.jobID = posts.jobID;
};

Posts.create = (newPostedJob, result) => {
  sql.query("INSERT INTO posts SET ?", newPostedJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created posted job: ", { id: res.insertId, ...newPostedJob });
    result(null, { id: res.insertId, ...newPostedJob });
  });
};

Posts.getAllJobsByUser = (userID, result) => {
  sql.query(`SELECT * FROM posts WHERE userID = ${userID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found job: ", res);
      result(null, res);
      return;
    }

    // not found job with the userID
    result({ kind: "not_found" }, null);
  });
};

Posts.getAllPostedJobsByUser = (userID, result) => {

    sql.query("SELECT * FROM posts WHERE userID = ? AND isPosted = ?", [userID, 1], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found job: ", res);
            result(null, res);
            return;
        }

        // not found job with the userID
        result({ kind: "not_found" }, null);
    });
};

Posts.getAllPostedJobs = (result) => {

    sql.query("SELECT * FROM posts WHERE isPosted = 1", (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found jobs: ", res);
            result(null, res);
            return;
        }

        // not found jobs
        result({ kind: "not_found" }, null);
    });
};

Posts.getAll = (result) => {
    sql.query("SELECT * FROM posts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("jobs: ", res);
      result(null, res);
    });
};

Posts.findById = (jobID, result) => {
  sql.query(`SELECT * FROM posts WHERE jobID = ${jobID}`, (err, res) => {
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

Posts.updatePostedById = (jobID, isPosted, result) => {
  sql.query(
    "UPDATE posts SET isPosted = ? WHERE jobID = ?",
    [isPosted, Number(jobID)],
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

      console.log("updated jobID " + jobID + "with isPosted " + isPosted);
      result(null, "Updated jobID " + jobID + " with isPosted " + isPosted);
    }
  );
};

Posts.remove = (jobID, result) => {
  sql.query("DELETE FROM job WHERE jobID = ?", jobID, (err, res) => {

    sql.query("DELETE FROM posts WHERE jobID = " + jobID);

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

// Job.removeAll = result => {
//   sql.query("DELETE FROM job", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} jobs`);
//     result(null, res);
//   });

//   sql.query("ALTER TABLE job AUTO_INCREMENT = 1");
// };

module.exports = Posts;
