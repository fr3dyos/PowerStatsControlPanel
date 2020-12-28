const express = require("express");
const router = express.Router();
const passport = require("passport");

const tournamentName = "Tournament Test 2021";

router.get("/", (req, res, next) => {
  var mess = null;
  if (req.query.fail) console.log(req.query);//mess ="Invalid user or password";

  res.render("login", {
    title: "",
    tournament: tournamentName,
    message: mess,
  });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?fail=true",
  })
);

module.exports = router;
