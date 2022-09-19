"use strict";

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");



require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// HANDLERS:

// ADD PIN
const addPin = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const savedPin = req.body
    try {
        const newPin = {
            _id: uuidv4(),
            username: savedPin.username,
            category: savedPin.category,
            description: savedPin.description,
            lat: savedPin.lat,
            long: savedPin.long,
        };

        await client.connect();
        const db = client.db("weather_app");
        const result = await db
        .collection("pins")
        .insertOne(newPin);
        console.log(result);

        res
        .status(201).json({ status: 201, data: newPin, message: "pin added" })
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

// GET PINs
const getPins = async (req, res) => {

    let start = req.query.start;
    let limit = req.query.limit;

    const client = new MongoClient(MONGO_URI, options);
    
        // connect to the client
        await client.connect();

        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("weather_app");
        console.log("connected");
    
        const pins = await db.collection("pins").find().toArray();

        console.log(pins);

        
        if (pins) {
            !start ?start=0 :start
            !limit ?limit=25 :limit
            const limitPins = pins.slice(start, parseInt(start) + parseInt(limit))
            res.status(200).json({ status: 200, data: limitPins })
        } else {
            res.status(404).json({ status: 404, data: "not found" });
        }   
    client.close();
    console.log("disconnected!");
};

// // UPDATES A PIN'S DESCRIPTION
const updatePin = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    const _id = req.body._id;
    const description = req.body.description;
    const query = { _id }
    const newDescription = { $set: { ...req.body } };

    try {
        await client.connect();
        const db = client.db("weather_app");

        const oldDescription = await db.collection("pins").findOne({ _id }).description;

        let descriptionChanged = oldDescription != description;

        // if the newly entered destination does not match the old one, update the database with new destination
        if (!descriptionChanged) {
            res.status(404).json({ status: 404, data: description, message: "Error: no change to description" });

        } else {
            const updateDescription = await db.collection("pins").updateOne({ _id }, { $set: { ...description}});
            res
                .status(201)
                .json({ status: 201, data: { newDescription }, message: "Successfully updated description" });
        }

} catch (err) {
    console.log(err.stack);
    res
        .status(500)
        .json({ status: 500, data: { newDescription }, message: err.message });
}
client.close();
};

//DELETES A PIN BY ID
const deletePin = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    const _id = req.params.pin;

    try {

        await client.connect();
        const db = client.db("weather_app");

        const result = await db
        .collection("pins")
        .deleteOne({ _id });
        console.log(result)
        result.deletedCount
        ? res
            .status(200)
            .json({ status: 200, data: result, message: "pin is deleted" })
        : res.status(404).json({ status: 404, message: "pin not found" });
    } catch (err) {
    console.log(err.stack);
    res.status(400).json({ status: 400, message: "error" });
  }
  client.close();
};
        //find the pin to be deleted in the database
//         const pinToDelete = await db.collection("pins").findOne({ _id });

//         if (pinToDelete) {
//             const deleted = await db.collection("pins").deleteOne({ _id });

//             if (deleted) {
//                 res.status(200).json({
//                     status: 200,
//                     data: deleted,
//                     message: "Successfully deleted pin",
//                 });
//             }
//         } else {
//             res.status(404).json({ status: 404, message: "Pin not found" });
//         }
//     } catch (err) {
//         console.log(err.stack);
//         res.status(500).json({ status: 500, message: err.message });
//     }
//     client.close();
// };


module.exports = {addPin, getPins, updatePin, deletePin};