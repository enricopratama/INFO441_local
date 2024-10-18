import { promises as fs } from "fs";
import express from "express";
import pluralize from "pluralize";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.type("html");
  let fileContents = await fs.readFile("index.html");
  res.send(fileContents);
});

app.get("/style.css", async (req, res) => {
  res.type("css");
  let fileContents = await fs.readFile("style.css");
  res.send(fileContents);
});

app.get("/index.js", async (req, res) => {
  res.type("js");
  let fileContents = await fs.readFile("index.js");
  res.send(fileContents);
});

app.get("/api/pluralize", async (req, res) => {
  let userWord = req.query.word;
  let pluralized = pluralize(userWord);
  res.type("txt");
  res.send(pluralized);
});

app.listen(3000, () => {
  console.log(`example app listening at http://localhost:/${port}`);
});
