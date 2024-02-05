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
  // useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect();
    // console.log("DB Connected!");
    const heroCollection = client.db("Infofarjax").collection("heroData");
    const exploreCollection = client.db("Infofarjax").collection("exploreData");
    const ceoCollection = client.db("Infofarjax").collection("CEO");
    const socialCollection = client.db("Infofarjax").collection("socialData");
    const bannerCollection = client.db("Infofarjax").collection("bannerData");
    const reviewCollection = client.db("Infofarjax").collection("reviewData");
    const ImageCollection = client.db("Infofarjax").collection("Images");
    const catagoriCollection = client
      .db("Infofarjax")
      .collection("catagoriData");
    const motivationCollection = client
      .db("Infofarjax")
      .collection("motivationData");
    const upComeingCourseCollection = client
      .db("Infofarjax")
      .collection("upCommingData");
    const choosepathCollection = client
      .db("Infofarjax")
      .collection("choosepathData");

    //  all of get request from mongodb database
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
      const upCommingData = await upComeingCourseCollection.find().toArray();
      res.send(upCommingData);
    });
    app.get("/aboutus/motivation", async (req, res) => {
      const motivation = await motivationCollection.find().toArray();
      res.send(motivation);
    });
    app.get("/aboutus/ceo", async (req, res) => {
      const ceo = await ceoCollection.find().toArray();
      res.send(ceo);
    });
    app.get("/social/links", async (req, res) => {
      const links = await socialCollection.find().toArray();
      res.send(links);
      // console.log(links);
    });
    app.get("/about/banner", async (req, res) => {
      const banner = await bannerCollection.find().toArray();
      res.send(banner);
      // console.log(banner);
    });
    // get catagoris collection
    app.get("/catagori", async (req, res) => {
      const banner = await catagoriCollection.find().toArray();
      res.send(banner);
      // console.log(banner);
    });

    app.get("/customer/review", async (req, res) => {
      const review = await reviewCollection.find().toArray();
      res.send(review);
      // console.log(review);
    });
    app.get("/images", async (req, res) => {
      const image = await ImageCollection.find().toArray();
      res.send(image);
      // console.log(image);
    });
    app.put("/images/:ID", async (req, res) => {
      const ID = req.params.ID;
      // const { image } = req.body;
      console.log(ID, image);

      try {
        const result = await ImageCollection.updateOne(
          {
            _id: new ObjectId(ID),
          },
          {
            $set: req.body,
          }
        );

        console.log(result);
        res.send({ result });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/choosepath/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const review = await choosepathCollection.find(query).toArray();
      res.send(review);
      // console.log(review);
    });

    // all of put request from mongodb database
    app.put("/about/banner/:id", async (req, res) => {
      const id = req.params.id;
      let result = bannerCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: req.body,
        }
      );
      res.send(result);
      // console.log(result, req.body);
    });

    app.put("/social/links/:ID", async (req, res) => {
      const ID = req.params.ID;
      const { facebook, instagram, twitter, youtube, linkedin, telegram } =
        req.body;

      try {
        let result = await socialCollection.updateOne(
          {
            _id: new ObjectId(ID),
          },
          {
            $set: {
              facebook: facebook,
              instagram: instagram,
              twitter: twitter,
              youtube: youtube,
              linkedin: linkedin,
              telegram: telegram,
            },
          }
        );
        // console.log(result);
        res.send({ status: "Successfully" });
      } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).send({ status: "Error updating document" });
      }
    });

    // put method
    app.put("/hero/:ID", async (req, res) => {
      const ID = req.params.ID;
      let result = heroCollection.updateOne(
        {
          _id: new ObjectId(ID),
        },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully", result });
      // console.log(result);
    });
    app.put("/course-offer/:ID", async (req, res) => {
      const ID = req.params.ID;
      // console.log(req.body, ID);
      let result = exploreCollection.updateOne(
        {
          _id: new ObjectId(ID),
        },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      // console.log(result);
    });
    app.put("/motivation/:ID", async (req, res) => {
      const ID = req.params.ID;
      // console.log(req.body, ID);
      let result = motivationCollection.updateOne(
        {
          _id: new ObjectId(ID),
        },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      // console.log(result);
    });

    app.put("/CeoDesh/:ID", async (req, res) => {
      const ID = req.params.ID;
      // console.log(ID);
      let result = ceoCollection.updateOne(
        { _id: new ObjectId(ID) },
        {
          $set: req.body,
        }
      );
      res.send({ status: "Successfully" });
      // console.log(result);
    });

    // all of delete request from mongodb database
    app.delete("/choose/course/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await choosepathCollection.deleteOne(query);
      res.send(result);
      // console.log(result);
    });
    // TO delete catagoris
    app.delete("/catagori/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await catagoriCollection.deleteOne(query);
      res.send(result);
      // console.log(result);
    });
    app.delete("/customer-review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
      // console.log(result);
    });

    // all of post request from mongodb database
    app.post("/choose/course/", async (req, res) => {
      const course = req.body;
      const result = await choosepathCollection.insertOne(course);
      res.send(result);
      // console.log(result);
    });
    // to create new catagoris
    app.post("/catagori", async (req, res) => {
      const catagori = req.body;
      // console.log(catagori);
      const result = await catagoriCollection.insertOne(catagori);
      res.send(result);
      // console.log(result);
    });
    app.post("/customer/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
      // console.log(result);
    });
    app.get("/choose/course/get/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await choosepathCollection.findOne(query);
      console.log(query);
      res.send(result);
      // console.log(result);
    });

    // filter courses useing seletedOptions
    app.get("/choose/course/:selectedOption", async (req, res) => {
      const select = req.params.selectedOption;
      const query = { selectedOption: select };
      // console.log(query);
      const result = await choosepathCollection.find(query).toArray();
      res.send(result);
      // console.log(result.length);
    });

    app.put("/choose/course/update/:id", async (req, res) => {
      const ID = req.params.id;
      console.log(ID);
      let result = choosepathCollection.updateOne(
        { _id: new ObjectId(ID) },
        {
          $set: req.body,
        }
      );
      console.log({ result }, req.body);
      res.send({ status: result });
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
