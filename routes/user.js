const router = require("express").Router();
const db = require('../db-connect');

router.get("/", (req, res) => {
    //Return all users
    const mongo = db.getDb();
    mongo.collection("users").find().toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result);
        }
    });
});

router.get("/:name", (req, res) => {
    //Return a user
    const mongo = db.getDb();
    mongo.collection("users").findOne({username: req.params.name}).toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result);
        }
    });
});

router.post("/", async (req, res) => {
    const mongo = db.getDb();

    const collection = mongo.collection("users");

    const usernameExists = await collection.findOne({username: req.body.username});
    if (usernameExists) return res.status(500).send("There is already an user with that username.");

    const emailExists = await collection.findOne({email: req.body.email});
    if (emailExists) return res.status(500).send("There is already an user with that email.");

    collection.insertOne({
        username: req.body.username,
        email: req.body.email,
    });

    return res.send("User created")
});

module.exports = router;