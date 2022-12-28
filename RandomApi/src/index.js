const express = require("express");
const cors = require("cors");
const app=express();
require("dotenv").config();
const connect=require('./config/db');



app.use(cors());
app.use(express.json()); //for post

const PORT = process.env.PORT 

// user controller.....
const randomController=require("./Controller/makers.controller");


//MiddleWare.....
app.use("/map",randomController);





app.listen(PORT, async () => {
    try {
      await connect();
    console.log(`Listening on port http://localhost:${PORT}`);
    } catch (error) {
      console.log(error);
    }
  });
  