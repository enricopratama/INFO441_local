<<<<<<< HEAD
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.userid) {
    res.send(`You are logged in as ${req.session.userid}`);
  } else {
    res.status(403).send("You are not logged in");
  }
});

router.post("/login", async(req, res) => {
  // TODO: add login logic in DB here later (DB HERE, password should be hashed)
  if (req.body.username == "kylethayer" && req.body.password == "asdasd"){ // For testing
    req.session.userid = "kylethayer"; 
    res.send("you logged in!");
    console.log("Login successful");
  } else if (req.body.username == "anotheruser" && req.body.password == "asdasd"){ // For testing
    req.session.userid = "anotheruser"; 
    res.send("you logged in!");
    console.log("Login successful");
  } else {
    res.status(403).send("Invalid login");
  }
})

router.post("/logout", async(req, res) => {
  req.session.destroy();
  res.send("You logged out successfully");
})

export default router;
||||||| 1ea6190
=======
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
>>>>>>> 9a62a48d4693cd43b7923e7c728d54c98eb6129c
