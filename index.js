const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;

app.use(cors());
app.use(express.json());
require("dotenv").config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DATABASE;
const dbCollectionB = process.env.DB_COLLECTIONb;
const dbCollectionD = process.env.DB_COLLECTIONd;
const dbCollectionL = process.env.DB_COLLECTIONl;

const uri = `mongodb+srv://${user}:${pass}@cluster0.pec8g.mongodb.net/${database}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const breakFast = client.db(`${database}`).collection(`${dbCollectionB}`);
  const dinner = client.db(`${database}`).collection(`${dbCollectionD}`);
  const lunch = client.db(`${database}`).collection(`${dbCollectionL}`);

  app.get("/", (req, res) => {
    dinner.find({}).toArray((err, data) => res.send(data));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
