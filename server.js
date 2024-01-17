const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const ceoCollection = client.db("Infofarjax").collection("CEO");
    const AboutCourseCollection = client
      .db("Infofarjax")
      .collection("AboutCourseData");
    const motivationCollection = client
      .db("Infofarjax")
      .collection("motivationData");
    const upComeingCourseCollection = client
      .db("Infofarjax")
      .collection("upCommingData");
    const choosepathCollection = client
      .db("Infofarjax")
      .collection("choosepathData");

    app.get("/hero", async (req, res) => {
      const hero = await heroCollection.find().toArray();
      res.send(hero);
    });

    app.get("/explore", async (req, res) => {
      const explore = await exploreCollection.find().toArray();
      res.send(explore);
    });

    app.get("/choosepath", async (req, res) => {
      const choosepath = await choosepathCollection.find().toArray();
      res.send(choosepath);
    });

    app.get("/course/upcommingTime", async (req, res) => {
      const choosepath = await upComeingCourseCollection.find().toArray();
      res.send(choosepath);
    });
    app.get("/aboutus/motivation", async (req, res) => {
      const choosepath = await motivationCollection.find().toArray();
      res.send(choosepath);
    });
    app.get("/aboutus/ceo", async (req, res) => {
      const ceo = await ceoCollection.find().toArray();
      res.send(ceo);
    });
    app.get("/courses/about_c", async (req, res) => {
      const about_c = await AboutCourseCollection.find().toArray();
      res.send(about_c);
    });

    // put method
    app.put("/hero/:ID", async (req, res) => {
      const ID = req.params.ID;
      console.log(req.body, ID);
      let result = heroCollection.updateOne(
        {
          _id: new ObjectId(ID),
        },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      console.log(result);
    });
    app.put("/course-offer/:ID", async (req, res) => {
      const ID = req.params.ID;
      console.log(req.body, ID);
      let result = exploreCollection.updateOne(
        {
          _id: new ObjectId(ID),
        },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      console.log(result);
    });
    app.put("/motivation/:ID", async (req, res) => {
      const ID = req.params.ID;
      console.log(req.body, ID);
      let result = motivationCollection.updateOne(
        {
          _id: new ObjectId(ID),
        },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      console.log(result);
    });

    app.put("/courses/about_c/:ID", async (req, res) => {
      const ID = req.params.ID;
      console.log(ID);
      let result = AboutCourseCollection.updateOne(
        { _id: new ObjectId(ID) },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      console.log(result);
    });
    app.put("/CeoDesh/:ID", async (req, res) => {
      const ID = req.params.ID;
      console.log(ID);
      let result = ceoCollection.updateOne(
        { _id: new ObjectId(ID) },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      console.log(result);
    });

    // delete courses
    app.delete("/choose/course/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await choosepathCollection.deleteOne(query);
      res.send(result);
      console.log(result);
    });
    app.post("/choose/course/", async (req, res) => {
      const course = req.body;
      const result = await choosepathCollection.insertOne(course);
      res.send(result);
      console.log(result);
    });
    app.get("/choose/course/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await choosepathCollection.findOne(query);
      console.log(query);
      res.send(result);
      console.log(result);
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
