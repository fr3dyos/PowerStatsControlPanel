//google spreadsheet config
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client_secret.json");
const spreadsheetRef = "1u5wL7opIGzHnEaMTXGRuW2AfXdeIrRYXXgLZ2M9Urm0";
const doc = new GoogleSpreadsheet(spreadsheetRef);
var dataPlayers = [];
var dataSchedule = [];

const Double = require("mongodb").Double;


function printPlayers(player) {
  const operation = dataPlayers.push({
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
  const operation = dataSchedule.push({
    game: game.game,
    field: game.field,
    teamA: game.teamA,
    scoreA: 0,
    scoreB: 0,
    teamB: game.teamB,
    date: new Date(game.date)
  });
}

async function accessPlayersSheet() {
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
}


async function accessScheduleSheet() {
  console.log("Attempt to access Spreadsheet");
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows();

  dataSchedule = [];
  await rows.forEach((row) => {
    printSchedule(row);
  });
  console.log("done!");
  return dataSchedule;
}

module.exports = {accessPlayersSheet,accessScheduleSheet};
