const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./config.env" });

const app = express();

app.get("/api/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date(),
  });
});

app.get("/api/:date?", (req, res) => {
  let dateStr = req.params.date;
  if (!isNaN(Date.parse(dateStr))) {
    let dateObj = new Date(dateStr);
    res.json({
      unix: dateObj.valueOf(),
      utc: dateObj.toUTCString(),
    });
  } else if (/\d{5,}/.test(dateStr)) {
    dateStr = parseInt(dateStr);
    res.json({
      unix: dateStr,
      utc: new Date(dateStr).toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log("app running on port", process.env.PORT);
});
