const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client_secret.json");
const spreadsheetRef = "1u5wL7opIGzHnEaMTXGRuW2AfXdeIrRYXXgLZ2M9Urm0";
const doc = new GoogleSpreadsheet(spreadsheetRef);
var dataPlayers = [];
var dataSchedule = [];
var dataLog = [];
var datatemp = [];

const Double = require("mongodb").Double;

function printPlayers(player) {
  const operation = datatemp.push({
    name: player.name,
    nickname: player.nick,
    gender: player.gender,
    team: player.team,
    number: player.number,
    country: player.country,
    goals: 0,
    defenses: 0,
    assists: 0,
    games: 0,
    goalsAv: Double(0.0),
    defensesAv: Double(0.0),
    assistsAv: Double(0.0),
    MVP: Double(0.0),
  });
}

function printSchedule(game) {
  const operation = datatemp.push({
    game: game.game,
    field: game.field,
    teamA: game.teamA,
    scoreA: 0,
    scoreB: 0,
    teamB: game.teamB,
    date: new Date(game.date),
  });
}

function printSchedule(ocorrence) {
  const operation = datatemp.push({
    game: ocorrence.game,
    teamA: ocorrence.teamA,
    scoreA: 0,
    scoreB: 0,
    teamB: ocorrence.teamB,
    ocorrence: ocorrence.ocorrence,
    playerAId: ocorrence.playerAId,
    playerBId: ocorrence.playerBId,
    date: new Date(ocorrence.date),
    elapsed: ocorrence.elapsed,
  });
}


async function accessSheet(idx) {
  console.log("***********************");
  console.log("Attempt to access sheet");
  console.log("idx: " + idx);
  console.log("***********************");

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[parseInt(idx)]; // or use doc.sheetsById[id]

  const rows = await sheet.getRows();
  datatemp = [];
  await rows.forEach((row) => {
    switch (parseInt(idx)) {
      case 0:
        printPlayers(row);
        break;
      case 1:
        printSchedule(row);
        break;
      case 2:
        printLog(row);
        break;
      default:
        printPlayers(row);
        break;
    }
  });
  console.log("done!");
  return datatemp;
}

module.exports =  accessSheet;















/*async function accessPlayersSheet() {
  console.log("Attempt to access Spreadsheet");
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows();
  dataPlayers = [];
  await rows.forEach((row) => {
    printPlayers(row);
  });
  console.log("done!");
  return dataPlayers;
}*/