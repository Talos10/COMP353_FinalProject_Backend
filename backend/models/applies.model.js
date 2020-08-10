const sql = require("./db.js");

// constructor
const Applies = function(applies) {
  this.isOffered = applies.isOffered;
  this.userID = applies.userID;
  this.jobID = applies.jobID;
  this.isAccepted = applies.isAccepted;
};

Applies.create = (newAppliedJob, result) => {
  sql.query("INSERT INTO appliesTo SET ?", newAppliedJob, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created applied job: ", { id: res.insertId, ...newAppliedJob });
    result(null, { id: res.insertId, ...newAppliedJob });
  });
};

Applies.getAllJobsByUser = (userID, result) => {
  sql.query(`SELECT * FROM appliesTo WHERE userID = ${userID}`, (err, res) => {
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

Applies.withdrawApplication = (userID, jobID, result) => {
  sql.query("DELETE FROM appliesTo WHERE userID = ? AND jobID = ?", [userID, jobID], (err, res) => {
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

    if (res.affectedRows == 0) {
      // not found job with the jobID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted application of user with userID " + userID + " for jobID " + jobID);
    result(null, res);
  });
};

Applies.getAll = (result) => {
  sql.query("SELECT * FROM appliesTo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("jobs: ", res);
    result(null, res);
  });
};

// Posts.getAllPostedJobsByUser = (userID, result) => {

//     sql.query("SELECT * FROM posts WHERE userID = ? AND isPosted = ?", [userID, 1], (err, res) => {

//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found job: ", res);
//             result(null, res);
//             return;
//         }

//         // not found job with the userID
//         result({ kind: "not_found" }, null);
//     });
// };

// Posts.getAllPostedJobs = (result) => {

//     sql.query("SELECT * FROM posts WHERE isPosted = 1", (err, res) => {

//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found jobs: ", res);
//             result(null, res);
//             return;
//         }

//         // not found jobs
//         result({ kind: "not_found" }, null);
//     });
// };



// Posts.findById = (jobID, result) => {
//   sql.query(`SELECT * FROM posts WHERE jobID = ${jobID}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found job: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found job with the jobID
//     result({ kind: "not_found" }, null);
//   });
// };

// Posts.updatePostedById = (jobID, isPosted, result) => {
//   sql.query(
//     "UPDATE posts SET isPosted = ? WHERE jobID = ?",
//     [isPosted, Number(jobID)],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found job with the jobID
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated jobID " + jobID + "with isPosted " + isPosted);
//       result(null, "Updated jobID " + jobID + " with isPosted " + isPosted);
//     }
//   );
// };

module.exports = Applies;