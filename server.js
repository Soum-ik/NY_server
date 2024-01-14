const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://infofarjax:y7ySv3LfkCWXXWUh@farjaxapps.he8z4hi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect();
    console.log("DB Connected!");
    const heroCollection = client.db("Infofarjax").collection("heroData");
    const exploreCollection = client.db("Infofarjax").collection("exploreData");

    app.get("/hero", async (req, res) => {
      const hero = await heroCollection.find().toArray();
      res.send(hero);
    });

    app.get("/explore", async (req, res) => {
      const explore = await exploreCollection.find().toArray();
      res.send(explore);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Paint Pro!");
});

app.listen(port, () => {
  console.log("Listening to port:", port);
});
