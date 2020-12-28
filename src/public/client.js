var socket;
var dataPlayers;

// Start only when document ready
$(document).ready(function () {
  socket = io.connect("http://localhost:3000");
  console.log("Socket connected");
  // messages from socket
  socket.on("dataFromSS", getDataFromSS);
  socket.on("teamData", getTeam);

  socket.on("playerData", playerInfoRecieved);
  socket.on("addedPlayer", function (name) {
    alert(name + " info added");
  });
  socket.on("updatedPlayer", function (name) {
    alert(name + " info updated");
  });
  socket.on("deletedPlayer", function (name) {
    alert(name + " info deleted");
    window.location.replace("/");
  });

  var pathCurrent = window.location.pathname;
  if (pathCurrent.substring(0, 8) === "/player-") {
    var playerId = pathCurrent.substring(8);
    console.log("Player id: " + playerId);
    try {
      getPlayer(playerId);
    } catch (err) {
      console.log("no player found");
      console.log(err);
    }
  }
});

/************recieving function *************/

function playerInfoRecieved(player) {
  console.log("player data recieved");
  console.log(player);
  try {
    if (player) {
      $("#pid").html("ID: " + player._id);
      $("#fname").val(player.name);
      $("#nname").val(player.nickname);
      $("#pnumber").val(player.number);
      $("#team").val(player.team);
      $("#country").val(player.country);
      $("#gender").val(player.gender);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getTeam(data) {
  console.log("Getting " + data + " players");
  if (data.length < 1) {
    console.log("no players from selected Team");
  } else {
    await $("#loadedInformation").html(tableFromDB(data));
    await $("#loadedInformation").addClass(
      "animate__animated animate__backInLeft "
    );
    await setTimeout(
      '$("#loadedInformation").removeClass("animate__animated animate__backInLeft ");',
      2000
    );
  }
}

async function getDataFromSS(data) {
  console.log("Data recieved");
  console.log(data.length + " players");
  if (data.length < 1) {
    console.log("no player data in the Spreadsheet");
  } else {
    await $("#loadedInformation").html(tableFromSS(data));
    await $("#loadedInformation").addClass(
      "animate__animated animate__backInLeft "
    );
    await setTimeout(
      '$("#loadedInformation").removeClass("animate__animated animate__backInLeft ");',
      2000
    );
    playersFromSS = data;
  }
}

// ******************** requests functions

function requestData() {
  var data = "spreadsheet";
  console.log("Sending request to server");
  socket.emit("spreadsheet", data);

  $("#loadedInformation").empty();
}

var playersFromSS;
function sendData() {
  console.log("Sending: All players' data");
  socket.emit("mongoDB", playersFromSS);
}

function getList(team) {
  console.log("Getting full team: " + team);
  socket.emit("getTeamPlayers", team);
}

function getPlayer(playerId) {
  console.log("Getting player from Id: " + playerId);
  socket.emit("getPlayer", playerId);
}

// ******************** send functions
//
function updatePlayer() {
  let player = {};
  player.name = $("#fname").val();
  player.team = $("#team").val();
  player.nickname = $("#nname").val();
  player.number = $("#pnumber").val();
  player.country = $("#country").val();
  player.gender = $("#gender").val();
  player.temp_id = $("#pid").html().substring(4);
  console.log("updating player Info: " + player.name);
  socket.emit("updatePlayer", player);
}

function deletePlayer() {
  let player = {};
  player.name = $("#fname").val();
  player.temp_id = $("#pid").html().substring(4);
  if (confirm("Are you sure?")) {
    console.log("deleting player Info: " + player.name);
    socket.emit("deletePlayer", player);
  } else {
    alert(player.name + " not deleted");
  }
}

function addNewPlayer() {
  let player = {};
  player.name = $("#fname").val();
  player.team = $("#team").val();
  player.nickname = $("#nname").val();
  player.number = $("#pnumber").val();
  player.country = $("#country").val();
  player.gender = $("#gender").val();
  console.log("Adding new player: " + player.name);
  socket.emit("addNewPlayer", player);
}
