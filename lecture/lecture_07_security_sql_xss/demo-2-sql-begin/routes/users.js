import express from "express";
import sqlite3 from "sqlite3";
var router = express.Router();

// create/load database
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Connected to the in-memory sqlite database.");
}); // using variables in my project

db.serialize(() => {
  db
    .run("CREATE TABLE people (first_name text, last_name text)")
    .run(
      `INSERT INTO people (first_name, last_name)
       VALUES ('John', 'Doe'),
              ('Jane', 'Smith'),
              ('Chuck', 'Norris')`
      )
      .run('CREATE TABLE secret_table(message text)')
      .run(`INSERT INTO secret_table(message)
        VALUES ('The password for Kyle is: pa55w0rd'),
               ('The treasure is hidden in the 5th floor')`
      );
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default router;
