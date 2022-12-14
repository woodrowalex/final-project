"use strict";

// import the needed node_modules.
const express = require("express");
// const morgan = require("morgan");

const {
    addPin, getPins, updatePin, deletePin
} = require("./handlers/pin-handlers");

const {
    addUser, login
} = require("./handlers/user-handlers");

express()

// Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    // .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // PLACEHOLDERS BELOW
    // ---------------------------------
    .post("/api/add-user", addUser) //working
    .post("/api/add-pin", addPin) //working
    .get("/api/get-pins", getPins)   
    .post("/api/login", login) //working

    .patch("/api/update-pin/:pin", updatePin)
    .delete("/api/delete-pin/:pin", deletePin)


    // .patch("/api/update-user", updateUser)


    // .delete("/api/delete-user/:user", deleteUser)


    // ---------------------------------
    // PLACEHOLDERS ABOVE

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));
