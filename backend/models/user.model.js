const sql = require("./db.js");

// constructor
const User = function(user) {
  this.userType = user.userType;
  this.email = user.email;
  this.membership = user.membership;
  this.password = user.password;
  this.accountBalance = user.accountBalance;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.accountStatus = user.accountStatus;
  this.isFrozen = user.isFrozen;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.findById = (userID, result) => {
  sql.query(`SELECT * FROM user WHERE userID = ${userID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the userID
    result({ kind: "not_found" }, null);
  });
};

User.findByIdAuth = (email, password, result) => {
  sql.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user!");
      result(null, res);
      return;
    }

    // not found user with specified email and password
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (userID, user, result) => {
  sql.query(
    "UPDATE user SET userType = ?, email = ?, membership = ?, password = ?, accountBalance = ?, firstName = ?, lastName = ?, accountStatus = ?, isFrozen = ? WHERE userID = ?",
    [user.userType, user.email, user.membership, user.password, user.accountBalance, user.firstName, user.lastName, user.accountStatus, user.isFrozen, userID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the userID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { userID: userID, ...user });
      result(null, { userID: userID, ...user });
    }
  );
};

User.remove = (userID, result) => {

  sql.query("DELETE FROM posts WHERE userID = " + Number(userID));  

  sql.query("DELETE FROM user WHERE userID = ?", userID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with userID: ", userID);
    result(null, res);
  });
};

User.removeAll = result => {

  sql.query("DELETE FROM posts");

  sql.query("DELETE FROM job");

  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });

  sql.query("ALTER TABLE user AUTO_INCREMENT = 1");
  sql.query("ALTER TABLE job AUTO_INCREMENT = 1");
  sql.query("ALTER TABLE posts AUTO_INCREMENT = 1");
};

module.exports = User;
