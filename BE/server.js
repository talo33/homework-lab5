import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Videos from "./dbVideo.js";
import Cors from "cors";

const app = express();
const port = process.env.PORT || 8000;
const connection_url =
  "mongodb+srv://pomanjr:pomanjr@cluster0.6tpmydc.mongodb.net/EShop";

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url);

app.get("/", (req, res) => res.status(200).send("Hello See"));

app.post("/dating/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

app.get("/dating/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});


// GET data
app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// POST
app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
