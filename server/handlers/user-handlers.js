"use strict";

const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');

const { v4: uuidv4 } = require('uuid');
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// LOG IN

const login = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("weather_app");
    let user = null;
  
    try {
      await client.connect();
      console.log("login")
      console.log(req.body)
      user = await db.collection("users").findOne({ email: req.body.email });
  
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          res.status(200).json({
            status: 200,
            data: user,
            message: "Log in success",
          });
        } else {
          res.status(404).json({
            status: 404,
            data: req.body,
            message: "Invalid Password",
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          data: req.body,
          message: "No account found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        data: req.body,
        message: err.message,
      });
    }
    client.close();
  };
  

// ADD USER (SIGNUP)

  const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("weather_app");
    let user = null;
    try {
      await client.connect();
      console.log("sign up")
      console.log(req.body)
      user = await db.collection("users").findOne({ email: req.body.email });

      if (!user) {
        req.body._id = uuidv4();
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = encryptedPassword;
        
        const userInserted = await db.collection("users").insertOne(req.body);
        if (userInserted) {
          res.status(200).json({
            status: 200,
            data: req.body,
          });
        } else {
          res.status(404).json({
            status: 404,
            data: req.body,
            message: "Sign up failed",
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          data: req.body,
          message: "That email already exists",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        data: req.body,
        message: err.message,
      });
    }
    client.close();
  };


module.exports = {addUser, login};