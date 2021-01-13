var socket;
var dataTemp;

// Start only when document ready
$(document).ready(function () {
  // Socket Connection
  socket = io.connect("http://localhost:3000");

  console.log("Socket connected");
  // Messages on Socket

  // Sheets
  socket.on("listFromSheets", function (data) {
    getData(data, 0);
  });
  socket.on("scheduleFromSheets", function (data) {
    getData(data, 1);
  });
  socket.on("logFromSheets", function (data) {
    getData(data, 2);
  });

  // Success feedback
  socket.on("success", function (action) {
    alert(action);
  });

  socket.on("listFromDB", function (data) {
    getData(data, 0);
  });
  socket.on("scheduleFromDB", function (data) {
    getData(data, 1);
  });
  socket.on("logFromDB", function (data) {
    getData(data, 2);
    console.log(data);
  });

  socket.on("playerData", playerInfoRecieved);
  socket.on("gameData", gameInfoRecieved);

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

/************     CLIENT FUNCTIONS     *************/
/************ recieving *************/

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

function gameInfoRecieved(game) {
  console.log("game data recieved");
  console.log(game);
  try {
    if (game) {
      $("#pid").html("Game " + game.game);
      $("#game").val(game.game);
      $("#field").val(game.field);
      $("#teamA").val(game.teamA);
      $("#teamB").val(game.teamB);
      $("#scoreA").val(game.scoreA);
      $("#scoreB").val(game.scoreB);
      $("#date").val(game.date);
    }
  } catch (err) {
    console.log(err);
  }
}

0


// ******************** requests functions
async function getData(data, idx) {
  console.log("Getting " + data.length + " lines");
  if (data.length < 1) {
    console.log("no Data found");
  } else {
    switch (idx) {
      case 0:
        await $("#loadedInformation").html(list2H(data));
        break;
      case 1:
        await $("#loadedInformation").html(schedule2H(data));
        break;
      case 2:
        await $("#loadedInformation").html(log2H(data));
        break;
    }
    await $("#loadedInformation").addClass(
      "animate__animated animate__backInLeft "
    );
    await setTimeout(
      '$("#loadedInformation").removeClass("animate__animated animate__backInLeft ");',
      2000
    );
    dataTemp = data;
  }
}



function getListSheets() {
  console.log("Sending request to server");
  socket.emit("getListSheets", 0);
  $("#loadedInformation").empty();
}

function getScheduleSheets() {
  console.log("Sending request to server");
  socket.emit("getScheduleSheets", 1);
  $("#loadedInformation").empty();
}

function getLogSheets() {
  console.log("Sending request to server");
  socket.emit("getLogSheets", 2);
  $("#loadedInformation").empty();
}

function getListBtn(team) {
  console.log("Getting full team: " + team);
  socket.emit("getList", team);
}


function getScheduleBtn() {
  console.log("Getting full Schedule");
  socket.emit("getSchedule", null);
}

function getLogBtn() {
  console.log("Getting full Log");
  socket.emit("getLog", null);
}

// ******************** set functions
//

function setListBtn() {
  if (confirm("Certeza?")) {
    console.log("Sending: All players' data");
    socket.emit("setList", dataTemp);
  }
}

function setScheduleBtn() {
  if (confirm("Certeza?")) {
    console.log("Sending: Schedule data");
    socket.emit("setSchedule", dataTemp);
  }
}
function setLogBtn() {
  if (confirm("Certeza?")) {
    console.log("Sending: Log data");
    socket.emit("setLog", dataTemp);
  }
}
//Player functions

function getPlayerBtn(playerId) {
  console.log("Getting player by Id: " + playerId);
  socket.emit("getPlayer", playerId);
}

function setPlayerBtn() {
  if (confirm("Are you sure?")) {
    let player = {};
    player.name = $("#fname").val();
    player.team = $("#team").val();
    player.nickname = $("#nname").val();
    player.number = $("#pnumber").val();
    player.country = $("#country").val();
    player.gender = $("#gender").val();
    console.log("Setting new player: " + player.name);
    socket.emit("setPlayer", player);
  }
}

function updatePlayerBtn() {
  if (confirm("Certeza?")) {
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
}

function deletePlayerBtn() {
  if (confirm("certeza?")) {
    let player = {};
    player.name = $("#fname").val();
    player.temp_id = $("#pid").html().substring(4);
    console.log("deleting player Info: " + player.name);
    socket.emit("deletePlayer", player);
  } else {
    alert(player.name + " not deleted");
  }
}



// Game Functions
function getGameBtn(gameId) {
  console.log("Getting game by Id: " + gameId);
  socket.emit("getGame", gameId);
}

function setGameBtn() {
  if (confirm("Are you sure?")) {
    let game = {};
    game.game = $("#gameN").val();
    game.field = $("#field").val();
    game.teamA = $("#teamA").val();
    game.teamB = $("#teamB").val();
    game.scoreA = $("#scoreA").val();
    game.scoreB = $("#scoreB").val();
    game.date = $("#date").val();
    console.log("Setting new game: " + game.game);
    socket.emit("setGame", game);
  }
}

function updateGameBtn() {
  if (confirm("Certeza?")) {
    let game = {};
    game.name = $("#fname").val();
    game.team = $("#team").val();
    game.nickname = $("#nname").val();
    game.number = $("#pnumber").val();
    game.country = $("#country").val();
    game.gender = $("#gender").val();
    game.temp_id = $("#pid").html().substring(4);
    console.log("updating game Info: " + game.name);
    socket.emit("updateGame", game);
  }
}

function deleteGameBtn() {
  if (confirm("certeza?")) {
    let game = {};
    game.name = $("#fname").val();
    game.temp_id = $("#pid").html().substring(4);
    console.log("deleting game Info: " + game.name);
    socket.emit("deleteGame", game);
  } else {
    alert(game.name + " not deleted");
  }
}
