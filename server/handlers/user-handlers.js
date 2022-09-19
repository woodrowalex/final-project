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
    const db = client.db("weather_app");
    
    const userBody = req.body
    
    try{
        await client.connect();
        const existingUser = await db.collection("users").findOne({email: userBody.email});

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const newUser = {
            _id: uuidv4(),
            username: userBody.username,
            email: userBody.email,
            password: hashedPassword,
        };

        if (!existingUser) {

        const addUser = await db.collection("users").insertOne(newUser);

        if (addUser) {
            res 
            .status(201)
            .json({ status: 201, data: newUser, message: "user added" });
        } else {
            res 
            .status(404)
            .json({ status: 404, data: newUser, message: "could not add user" });
        }

    } else {
        res 
            .status(404)
            .json({ status: 404, data: newUser, message: "email already in db" });
    }
}
        catch (err) {
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
    const db = client.db("weather_app");

    let attempt = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };


    try {
    await client.connect();
        const existingUser = await db.collection("users").findOne({email: attempt.email});

        if (existingUser) {
            if (attempt.password === existingUser.password) {
                console.log("login successful");
                res.status(200).json({
                    status: 200,
                    data: existingUser.username,
                    message: "You are logged in"
                });
            } else {
                console.log("incorrect pw")
                res.status(404).json({
                    status: 404,
                    data: attempt.email,
                    message: "incorrect password"
                });
            }
        } else {
            console.log("account not found")
            res.status(404).json({
                status: 404,
                data: attempt.email,
                message: "account not found"
            });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });

    }
    client.close();
    console.log("disconnected!");
};


module.exports = {addUser, login};