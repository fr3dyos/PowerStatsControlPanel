const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const Double = require("mongodb").Double;
MONGODB_URI =
  "mongodb+srv://rwadminps:zthTrN2Y93LZFskP@cluster0.0b4ks.mongodb.net/DB01?retryWrites=true&w=majority";

const client = new MongoClient(MONGODB_URI, {
  useUnifiedTopology: true,
});

const databaseName = "CBBU2021"; //name of the tournamen
const collectionName = "Players"; //name of the table




async function getPlayer(playerid, content, auth) {
  console.log("Getting player info");
  try {
    if (!client.isConnected()){
      await client.connect();
    }
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const result = await collection.findOne({ _id: ObjectId(playerid) });
    console.log(result);
    client.close();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

var player = getPlayer("5fd55c47661dec18c8ad34d2");
console.log(player);
player = getPlayer("fd55c47661dec18c8ad34d2");
console.log(player);
