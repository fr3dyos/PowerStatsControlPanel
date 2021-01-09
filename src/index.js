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
  //sheets
  socket.on("getListSheets", getFromSheets);
  socket.on("getScheduleSheets", getFromSheets);
  socket.on("getLogSheets", getFromSheets);
  // Set to MongoDB
  socket.on("setList", setList);
  socket.on("setSchedule", setSchedule);
  socket.on("setLog", setLog);
  // Get from MongoDB
  socket.on("getList", getList);
  socket.on("getSchedule", getSchedule);
  socket.on("getLog", getLog);

  socket.on("getPlayer", getPlayerFromDB);
  socket.on("updatePlayer", updatePlayerToDB);
  socket.on("deletePlayer", deletePlayerFromDB);
  socket.on("addNewPlayer", setPlayerToDB);

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
    console.log("Sending data to database");
    var flag = await Atlas.setList2db(data);
    if (flag) {
      console.log("Data was send to database succesfully");
      socket.emit("success", "Lista adicionada com sucesso");
    } else {
      console.log("Error while sending data to database");
      socket.emit("success", "Erro adicionando a Lista");
    }
  }

  async function setSchedule(data) {
    console.log("Sending data to database");
    var flag = await Atlas.setSchedule2db(data);
    if (flag) {
      console.log("Data was send to database succesfully");
      socket.emit("success", "Planilha adicionada com sucesso");
    } else {
      console.log("Error while sending data to database");
      socket.emit("success", "Erro adicionando a Planilha");
    }
  }

  async function setLog(data) {
    console.log("Sending data to database");
    var flag = await Atlas.setLog2db(data);
    if (flag) {
      console.log("Data was send to database succesfully");
      socket.emit("success", "Log adicionado com sucesso");
    } else {
      console.log("Error while sending data to database");
      socket.emit("success", "Erro adicionando o Log");
    }
  }

  async function getPlayerFromDB(playerid) {
    console.log("Getting data from database");
    const playerData = await Atlas.getPlayer(playerid);
    await socket.emit("playerData", playerData);
  }

  async function getList(teamName) {
    console.log("Getting data from database");
    const listData = await Atlas.getList(teamName);
    await socket.emit("listFromDB", listData);
  }

  
  async function getSchedule() {
    console.log("Getting data from database");
    const scheduleData = await Atlas.getSchedule();
    await socket.emit("scheduleFromDB", scheduleData);
  }

  async function getLog() {
    console.log("Getting data from database");
    const logData = await Atlas.getLog();
    await socket.emit("logFromDB", logData);
  }

  

  async function updatePlayerToDB(player) {
    console.log("Sending data to database");
    var flag = await Atlas.updatePlayer(player);
    if (flag) {
      console.log("Data was send to database succesfully");
      socket.emit("success", "Dados do jogador atualizados " + player.name);
    } else {
      console.log("Error while sending data to database");
    }
  }
  async function deletePlayerFromDB(player) {
    console.log("Deleting data from database");
    var flag = await Atlas.deletePlayer(player);
    if (flag) {
      console.log("Data was delete from database succesfully");
      socket.emit("success", "Dados do jogador pagados " + player.name);
    } else {
      console.log("Error while deleting data to database");
    }
  }

  async function setPlayerToDB(player) {
    console.log("Sending data to database");
    var flag = await Atlas.setPlayer(player);
    if (flag) {
      console.log("Data was send to database succesfully");
      socket.emit("success", "Dados do jogador adicionados " + player.name);
    } else {
      console.log("Error while sending data to database");
    }
  }
}
/****************************SOCKET CONFIG****************************/
