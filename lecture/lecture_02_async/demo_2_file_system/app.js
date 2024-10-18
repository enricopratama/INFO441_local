import express from "express";
import { promises as fs } from "fs";

const app = express();

app.get("/", async (req, res) => {
  res.type("html");
  let fileContents = await fs.readFile("index.html");
  res.send(fileContents);
});

app.get("/style.css", async (req, res) => {
  res.type(".css");
  let fileContents = await fs.readFile("style.css", "utf8");
  res.send(fileContents);
});
app.listen(3000, () => {
  console.log("example app listening at http://localhost:3000/");
});
