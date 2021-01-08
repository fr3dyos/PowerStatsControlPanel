const express = require("express");
const app = express();
const path = require("path");

const passport = require("passport");
const session = require("express-session");
// Authentication
require("./auth")(passport);

// settings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("routes", path.join(__dirname, "routes"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// Session

app.use(
  session({
    secret: "123", //configure um segredo seu aqui,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }, //30min
  })
);

app.use(passport.initialize());
app.use(passport.session());

//middleware
function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

//routes
app.use("/", require("./routes/index"));
//app.use("/", authenticationMiddleware, require("./routes/index"));
app.use("/login", require("./routes/login"));

//static files
app.use(express.static(path.join(__dirname + "/public")));

// listenting server
var server = app.listen(app.get("port"), () => {
  console.log("Server running on port: ", app.get("port"));
});

/****************************SPREADSHEET****************************/

const gSheet = require("./g-spreadsheets");

/**************************** MongoDB ****************************/
const Atlas = require("./mongo-atlas");

/****************************SOCKET CONFIG****************************/
var socket = require("socket.io");
var io = socket(server);

io.sockets.on("connection", newConnection);

/****************************SOCKET IN****************************/
function newConnection(socket) {
  console.log("New Connection: " + socket.id);

  socket.on("getListSheets", getFromSheets);
  socket.on("getScheduleSheets", getFromSheets);
  socket.on("getLogSheets", getFromSheets);
  socket.on("setList", setList);
  socket.on("sendFullSchedule", setNewSchedule);
  socket.on("getPlayer", getPlayerFromDB);
  socket.on("updatePlayer", updatePlayerToDB);
  socket.on("deletePlayer", deletePlayerFromDB);
  socket.on("addNewPlayer", setPlayerToDB);
  socket.on("getList", getList);

  async function getFromSheets(idx) {
    console.log("Getting data from Spreadsheet");
    var data = await gSheet.accessSheet(idx);
    switch (idx) {
      case 0:
        await socket.emit("listFromSheets", data);
        break;
      case 1:
        await socket.emit("scheduleFromSheets", data);
        break;
      case 2:
        await socket.emit("logFromSheets", data);
        break;
    }
  }

  async function setList(data) {
    if (confirm("Certeza que quer enviar a info para DB?")) {
      console.log("Sending data to database");
      var flag = await Atlas.setList(data);
      if (flag) {
        console.log("Data was send to database succesfully");
        alert("Dados enviados com sucesso!");
      } else {
        console.log("Error while sending data to database");
        alert("Erro no envio de dados!");
      }
    }
  }

  async function setNewSchedule(data) {
    console.log("Sending data to database");
    var flag = await Atlas.schedule2db(data);
    if (flag) {
      console.log("Data was send to database succesfully");
      alert("Dados enviados com sucesso!");
    } else {
      console.log("Error while sending data to database");
      alert("Erro no envio de dados!");
    }
  }

  async function getPlayerFromDB(playerid) {
    console.log("Getting data from database");
    const playerData = await Atlas.getPlayer(playerid);
    await socket.emit("playerData", playerData);
  }

  async function getList(teamName) {
    console.log("Getting data from database");
    const teamData = await Atlas.getList(teamName);
    await socket.emit("listFromDB", teamData);
  }

  async function updatePlayerToDB(player) {
    console.log("Sending data to database");
    var flag = await Atlas.updatePlayer(player);
    if (flag) {
      console.log("Data was send to database succesfully");
      alert("Dados enviados com sucesso!");
      await socket.emit("updatedPlayer", player.name);
    } else {
      console.log("Error while sending data to database");
      alert("Erro no envio de dados!");
    }
  }
  async function deletePlayerFromDB(player) {
    console.log("Deleting data from database");
    var flag = await Atlas.deletePlayer(player);
    if (flag) {
      console.log("Data was delete from database succesfully");
      alert("Dados enviados com sucesso!");
      await socket.emit("deletedPlayer", player.name);
    } else {
      console.log("Error while deleting data to database");
      alert("Erro no envio de dados!");
    }
  }

  async function setPlayerToDB(player) {
    console.log("Sending data to database");
    var flag = await Atlas.setPlayer(player);
    if (flag) {
      console.log("Data was send to database succesfully");
      alert("Dados enviados com sucesso!");
      await socket.emit("addedPlayer", player.name);
    } else {
      console.log("Error while sending data to database");
      alert("Erro no envio de dados!");
    }
  }
}
/****************************SOCKET CONFIG****************************/
