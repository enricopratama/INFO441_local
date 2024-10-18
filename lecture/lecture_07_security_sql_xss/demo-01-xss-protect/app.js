import express from "express";
import * as cheerio from "cheerio";

const app = express();

const escapeHTML = (str) =>
  String(str).replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag])
  );

const userInputWithHTML =
  "Your <em>shouldn't </em> allow <strong> any </strong> html from users to be rendered as html";

function vulnerableAddUserInput() {
  return `
    <strong>Here is the input:</strong>
    <p>${userInputWithHTML}</p>`;
}

function fixWithFunction() {
  return `
    <p>
    <strong> Here is the user input: </strong> ${escapeHTML(
      userInputWithHTML
    )}`;
}

function fixWithInnerText() {
  let htmlString = `
    <p>
    <strong> Here is the user input: </strong> <span id="userInput1"></span>
    </p>
    `;

  let parsedHTML = cheerio.load(htmlString);
  // set the "text" to be the user input, not the HTML

  parsedHTML("#userInput1").text(userInputWithHTML);
  return parsedHTML.html();

  // in browser (client), use:
  // document.getElementById("userInput1").innerText = userInputWithHTML;
}

app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>Demo XSS Escaping</title>
            </head>
            <body>
            <h2>Vulnerable Add User Input</h2>
            ${vulnerableAddUserInput()}

            <h2>Fixed with Function</h2>
            ${fixWithFunction()}

            <h2>Fixed with Inner Text</h2>
            ${fixWithInnerText()}
            </body> 
        </html>
        `);
});

app.listen(3000, () => {
  console.log("App listening in http://localhost:3000");
});
