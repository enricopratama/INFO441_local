import { promises as fs } from "fs";
import express from "express";
import dateFormat from "dateformat";
const app = express();

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

app.get("/api/getTime", async (req, res) => {
  let day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  res.type("txt");
  res.send(day);
});

app.listen(3000, () => {
  console.log("example app listening at http://localhost:3000/");
});
