"use strict";

const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// HANDLERS

// ADD USER (SIGNUP)
const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userBody = req.body
    
    try{
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const newUser = {
            username: userBody.username,
            email: userBody.email,
            password: hashedPassword,
        };

        await client.connect();
        const db = client.db("weather_app");
        const result = await db
            .collection("users")
            .insertOne(newUser);
            console.log(result);
            
            res 
            .status(201)
            .json({ status: 201, data: newUser, message: "user added" });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({
            status: 500,
            data: { result },
            message: err.message,
        });
    }
    client.close();
};

// LOG IN
const login = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {

    await client.connect();
        const db = client.db("weather_app");
        const _id = req.params._id
        let username = req.body.username
        const result = await db.collection("users").findOne({username});
        !result && res.status(400).json("Wrong username or password");
        
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    result.password
                );
                !validPassword && res.status(400).json("Your username or password is incorrect!")

        result
        ? res.status(200).json({ status: 200, _id: result._id, username: result.username })
        : res.status(404).json({ status: 404, _id, data: "user not found" });
    } catch (err) { 
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }

    client.close();
    console.log("disconnected!");
};


module.exports = {addUser, login};