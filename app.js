const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const apps = require("./playstore");

app.get("/apps", (req, res) => {
  // code goes here
  const { sort, genre = "" } = req.query;
  const validGenres = [
    `Action`,
    `Puzzle`,
    `Strategy`,
    `Casual`,
    `Arcade`,
    `Card`,
  ];

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sor must be one of rating or app");
    }
  }

  if (genre) {
    if (!validGenres.includes(genre)) {
      return res
        .status(400)
        .send(
          "Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card"
        );
    }
  }

  let results = apps.filter((app) =>
    app.Genres.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(apps);
});

module.exports = app;


