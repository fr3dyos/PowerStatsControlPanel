const dotenv = require("dotenv");
dotenv.config({ path: "./src/.env" });

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const Double = require("mongodb").Double;

const client = new MongoClient(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});

const databaseName = "CBBU2021"; //name of the tournamen
const collectionPlayers = "Players"; //name of the table
const collectionSchedule = "Schedule"; //name of the table
const collectionLog = "Log"; //name of the table

async function data2db(dataPlayers, content, auth) {
  console.log("Uploading to DB");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    const result = await collection.insertMany(dataPlayers);
    return result;
    //client.close();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function schedule2db(dataSchedule, content, auth) {
  console.log("Uploading Schedule to DB");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    const result = await collection.insertMany(dataSchedule);
    return result;
    //client.close();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updatePlayer(player, content, auth) {
  console.log(player);
  player._id = ObjectId(player.temp_id);
  delete player.temp_id;
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    let result = await collection.updateOne(
      { _id: ObjectId(player._id) },
      {
        $set: {
          name: player.name,
          nickname: player.nickname,
          number: player.number,
          gender: player.gender,
          country: player.country,
          team: player.team,
        },
        $currentDate: { lastModified: true },
      },
      { upsert: true }
    );
    console.log("player updated");
    //client.close();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deletePlayer(player, content, auth) {
  console.log(player);
  player._id = ObjectId(player.temp_id);
  delete player.temp_id;
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    let result = await collection.deleteOne({ _id: ObjectId(player._id) });
    console.log("player deleted");
    //client.close();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function setPlayer(player, content, auth) {
  console.log(player);
  player.goals = 0;
  player.defenses = 0;
  player.assists = 0;
  player.games = 0;
  player.goalsAv = Double(0.0);
  player.defensesAv = Double(0.0);
  player.assistsAv = Double(0.0);
  player.MVP = Double(0.0);
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    let result = await collection.insertOne(player);
    console.log("Player Added succesfully");
    //client.close();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

var result;
async function getPlayer(playerid, content, auth) {
  console.log("Getting player info");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    result = await collection.findOne({ _id: ObjectId(playerid) });
    await console.log(result);
    //client.close();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getTeamPlayers(teamName, content, auth) {
  try {
    console.log("Getting team info");
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    if (teamName) {
      console.log("Getting " + teamName + " Players");
      let playerCursor = await collection.find({ team: teamName });
      let playerList = await playerCursor.toArray();
      return playerList;
    } else {
      console.log("Getting All Players");
      let playerCursor = await collection.find({});
      let playerList = await playerCursor.toArray();
      return playerList;
    }
    //client.close();
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  data2db,
  updatePlayer,
  getPlayer,
  setPlayer,
  getTeamPlayers,
  deletePlayer,
  schedule2db
};
