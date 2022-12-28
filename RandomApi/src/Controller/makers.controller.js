// const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const Map = require("../Model/makers.model");
const { v4: uuidv4 } = require("uuid");
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const URL = process.env.MONGODB_URL;

let dbs;
let data;
// let count = 1;
let val1;
let val2;
let bag = {
    "_id":"9492445c-b7b6-422b-9173-ef234400c672",
  "latitude": "32.1024",
  "longitude": "77.5619",
};

// for random LONGITUDE & LATITUDE api...

// LONGITUDE -180 to + 180
function generateRandomLong() {
  var num = (Math.random() * 180).toFixed(3);
  var posorneg = Math.floor(Math.random());
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}
// LATITUDE -90 to +90
function generateRandomLat() {
  var num = (Math.random() * 90).toFixed(3);
  var posorneg = Math.floor(Math.random());
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}

router.get("/", async (req, res) => {
  try {
      setInterval(() => {
         data = [];
        val1 = generateRandomLong();
        val2 = generateRandomLat();
        data.push({_id:uuidv4(), longitude: val1, latitude: val2 });
        
    }, 100);

    // bag["longitude"]=val1;
    // bag["latitude"]=val2;

    MongoClient.connect(URL, (err, db) => {
      if (err) {
        throw err;
      }
      dbs = db.db("GoogleMapMakers");
      dbs.collection("googlemaps").insertMany(data);
    //   console.log(data, "dataa");
    });

    const randomVal = await Map.find().lean().exec();
    return res.status(200).send({ randomVal });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const randomVal = await Map.create(req.body);
    return res.status(201).send({ randomVal });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
