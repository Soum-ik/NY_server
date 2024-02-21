const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const { isEqual } = require("lodash");
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
    const AdminCollection = client.db("Infofarjax").collection("Admin");
    const ApplicationFormCollection = client
      .db("Infofarjax")
      .collection("Application");
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

    // signup or password login system
    app.get("/admin", async (req, res) => {
      try {
        const admin = await AdminCollection.findOne();

        res.status(200).send(admin);
      } catch (error) {
        return res.status(404).send("Admin not found");
      }
    });

    app.post("/forgot-password", async (req, res) => {
      try {
        const { email } = req.body;
        const user = await AdminCollection.findOne({ email: email });
        console.log(email, user);
        if (!user) {
          return res.send({ Status: "User not existed" });
        }

        // const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
        //   expiresIn: "1d",
        // });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sarkarsoumik215@gmail.com",
            pass: "unyn oiqq kavj awzj",
          },
        });

        const mailOptions = {
          from: "sarkarsoumik215@gmail.com",
          to: "ratulsarkar216@gmail.com",
          subject: "Reset Password Link",
          text: `https://farjaxiot.vercel.app/reset_password/${user._id}`,
        };
        console.log(mailOptions.text);
        await transporter.sendMail(mailOptions);
        return res.send({ Status: "Success" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    app.put("/reset-password/:id", (req, res) => {
      const { id } = req.params;
      const { password } = req.body;
      console.log(password, id);
      try {
        const res = AdminCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { password: password } }
        );

        console.log({ res });
        res.send({ Status: "Success" });
      } catch (error) {
        res.send({ Status: error });
      }
    });

    app.get("/application", async (req, res) => {
      const result = await ApplicationFormCollection.find().toArray();
      res.send(result);
    });

    app.get("/explore", async (req, res) => {
      const explore = await exploreCollection.find().toArray();
      res.send(explore);
    });

    app.get("/choosepath", async (req, res) => {
      const choosepath = await choosepathCollection.find().toArray();
      res.send(choosepath);
    });
    app.get("/choosepath/:id", async (req, res) => {
      const id = req.params.id; // Correctly extract the "id" parameter
      const choosepath = await choosepathCollection.findOne({
        _id: new ObjectId(id),
      }); // Query the database with the "id"
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

    const { ObjectId } = require("mongodb"); // Import ObjectId from mongodb

    app.put("/images/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const post = req.body.post;

        // Check if the post data is valid
        if (!post) {
          return res.status(400).json({ error: "Missing post data" });
        }

        // Update the image document in the database
        const result = await ImageCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { image: post } },
          { returnOriginal: false } // Ensure to return the updated document
        );

        // Check if the result is null (no document found)
        if (!result) {
          return res.status(404).json({ error: "Image not found" });
        }

        // Send the updated document in the response
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
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
    app.delete("/application/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ApplicationFormCollection.deleteOne(query);
      res.send({ status: "succes", result });
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
    app.post("/application/post", async (req, res) => {
      const request = req.body;
      const result = await ApplicationFormCollection.insertOne(request);
      res.send({ status: "succes", result });
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

    app.put("/customer/review/:id", async (req, res) => {
      const ID = req.params.id;
      console.log(ID);
      let result = reviewCollection.updateOne(
        { _id: new ObjectId(ID) },
        {
          $set: req.body,
        }
      );
      console.log({ result }, req.body);
      res.send({ status: result });
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
