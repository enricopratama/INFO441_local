import express from "express";
import sqlite3 from "sqlite3";
var router = express.Router();

// create/load database
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory sqlite database.");
});

// Initialize tables
db.serialize(() => {
  db
    .run("CREATE TABLE people (first_name text, last_name text)")
    .run(
      `INSERT INTO people (first_name, last_name)
       VALUES ('John', 'Doe'),
              ('Jane', 'Smith'),
              ('Chuck', 'Norris'),
              ('Kyle', 'Thayer')`
    )
    .run('CREATE TABLE secret_table(message text)')
    .run(
      `INSERT INTO secret_table(message)
        VALUES ('The password for Kyle is: pa55w0rd'),
               ('The treasure is hidden on the 5th floor')`
    );
});

// Main route to search people by first name
router.get("/", function (req, res, next) {
  let nameSearch = req.query.nameSearch;
  nameSearch = nameSearch ? nameSearch : "";

  if (!nameSearch) {
    res.send("Please provide a name to search.");
    return;
  }

  // Use a parameterized query to prevent SQL injection
  db.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`,
    (err, allRows) => {
    if (err) {
      return console.error(err.message);
    }
    if (allRows.length === 0) {
      res.send("No matching records found.");
      return;
    }

    // Map and join to format the response
    const matchingPeople = allRows
      .map(row => `${row.first_name} ${row.last_name}`)
      .join("\n");

    res.send(matchingPeople);
  });
});

export default router;
