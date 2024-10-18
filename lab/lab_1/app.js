const express = require("express");
const fs = require("fs").promises;
const port = 3000;
const app = express();

app.get("/", async (req, res) => {
  const files = await fs.readdir(process.cwd() + "/song_lyrics");
  // console.log(files);

  /**
   * Reads the content of the first file in the 'song_lyrics' directory.
   *
   * @constant {Buffer} fileContent - The content of the file read from the 'song_lyrics' directory.
   * @throws {Error} Will throw an error if the file cannot be read.
   */
  const fileContent = await fs.readFile(
    process.cwd() + "/song_lyrics/" + files[0]
  );

  // console.log(fileContent.toString());
  res.type("text").send(fileContent.toString());
});

app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});
