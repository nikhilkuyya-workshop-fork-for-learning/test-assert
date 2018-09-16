const acorn = require("acorn");
const fs = require("fs");

acorn.parse(fs.readFileSync("index.js", "utf-8"));
