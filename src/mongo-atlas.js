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
var result;

async function setList(dataPlayers, content, auth) {
  console.log("Uploading to DB");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    const result = await collection.insertMany(dataPlayers);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function setSchedule(dataSchedule, content, auth) {
  console.log("Uploading Schedule to DB");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    const result = await collection.insertMany(dataSchedule);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function setLog(dataLog, content, auth) {
  console.log("Uploading Log to DB");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionLog);
    const result = await collection.insertMany(dataLog);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getList(teamName, content, auth) {
  try {
    console.log("Getting team info");
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    if (teamName) {
      console.log("Getting " + teamName + " Players");
      let cursor = await collection.find({ team: teamName });
      let list = await cursor.toArray();
      return list;
    } else {
      console.log("Getting All Players");
      let cursor = await collection.find({});
      let list = await cursor.toArray();
      return list;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getSchedule(content, auth) {
  try {
    console.log("Getting Schedule info");
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    let cursor = await collection.find({});
    let list = await cursor.toArray();
    return list;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getLog(content, auth) {
  try {
    console.log("Getting Log info");
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionLog);
    let cursor = await collection.find({});
    let list = await cursor.toArray();
    return list;
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

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getPlayer(playerid, content, auth) {
  console.log("Getting player info");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionPlayers);
    const result = await collection.findOne({ _id: ObjectId(playerid) });
    await console.log(result);

    return result;
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

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getGame(gameid, content, auth) {
  console.log("Getting game info");
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    const result = await collection.findOne({ _id: ObjectId(gameid) });
    await console.log(result);

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function setGame(game, content, auth) {
  console.log(game);

  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    if (!game.scoreA) {
      game.scoreA = 0;
      game.scoreB = 0;
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    let result = await collection.insertOne(game);
    console.log("Game Added succesfully");

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateGame(game, content, auth) {
  console.log(game);
  game._id = ObjectId(game.temp_id);
  delete game.temp_id;
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    let result = await collection.updateOne(
      { _id: ObjectId(game._id) },
      {
        $set: {
          game: game.game,
          field: game.field,
          teamA: game.teamA,
          teamB: game.teamB,
          scoreA: game.scoreA,
          scoreB: game.scoreB,
          date: game.date,
        },
        $currentDate: { lastModified: true },
      },
      { upsert: true }
    );
    console.log("game updated");

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteGame(game, content, auth) {
  console.log(game);
  game._id = ObjectId(game.temp_id);
  delete game.temp_id;
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionSchedule);
    let result = await collection.deleteOne({ _id: ObjectId(game._id) });
    console.log("game deleted");

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  setList,
  setSchedule,
  setLog,
  getList,
  getSchedule,
  getLog,
  getPlayer,
  setPlayer,
  updatePlayer,
  deletePlayer,
  getGame,
  setGame,
  updateGame,
  deleteGame,
};
