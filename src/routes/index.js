const express = require("express");
const router = express.Router();

const tournamentName = "Tournament Test 2021";

router.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to Power Stats",
    tournament: tournamentName,
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Page",
    tournament: tournamentName,
  });
});
router.get("/about", (req, res) => {
  res.render("about", { title: "About Page", tournament: tournamentName });
});

router.get("/list", (req, res) => {
  res.render("list", {
    title: "Player lists",
    tournament: tournamentName,
    table: "",
  });
});

router.get("/log", (req, res) => {
  res.render("log", {
    title: "Log list",
    tournament: tournamentName,
    table: "",
  });
});

router.get("/schedule", (req, res) => {
  res.render("schedule", {
    title: "Load Schedule from Sheets",
    tournament: tournamentName,
    table: "",
  });
});

router.get("/team-*", (req, res) => {
  res.render("teams", {
    title: "Team Information",
    tournament: tournamentName,
    table: "",
  });
});

router.get("/player-*", (req, res) => {

  res.render("player", {
    title: "Player Info",
    tournament: tournamentName,
    btnTag: "ATUALIZAR",
    btnFunction: "updatePlayerBtn();",
  });
});

router.get("/game-*", (req, res) => {

  res.render("game", {
    title: "Game Info",
    tournament: tournamentName,
    btnTag: "ATUALIZAR",
    btnFunction: "updateGameBtn();",
  });
});

router.get("/newgame", (req, res) => {

  res.render("game", {
    title: "Game Info",
    tournament: tournamentName,
    btnTag: "ADICIONAR",
    btnFunction: "setGameBtn();",
  });
});


router.get("/newplayer", (req, res) => {

  res.render("player", {
    title: "Player Info",
    tournament: tournamentName,
    btnTag: "ADICIONAR",
    btnFunction: "setPlayerBtn();", 
  });
});

module.exports = router;
