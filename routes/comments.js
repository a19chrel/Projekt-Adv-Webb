const router = require("express").Router();
const db = require('../db-connect');
const {ObjectID, ObjectId} = require("mongodb");
const mongo = db.getDb();

router.get("/book/:bookid", (req, res) => {
    //Return all comments of an book
    const mongo = db.getDb();
    mongo.collection("reviews").find({ book_title: req.params.bookid }).toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result);
        }
    });
});

router.post("/", async (req, res) => {
    //Create a comment
    const mongo = db.getDb();
    console.log(req.body)
    const user = await mongo.collection("users").findOne({username: req.body.user});
    if (!user) return res.status(401).send("That user does not exists.");

    mongo.collection("reviews").insertOne({
        book_title: req.body.book_title,
        title: req.body.title,
        message: req.body.message,
        rating: req.body.rating,
        user: user
    });
});

router.put("/:id", async (req, res) => {
    //Update a comment
    console.log(req.body)
    const mongo = db.getDb();
    mongo.collection("reviews").updateOne(
        { "_id": ObjectId(req.params.id) },
        {
            $set: {
                "title": req.body.title,
                "message": req.body.message,
                "rating": req.body.rating,
            }
        },
        {upsert: true}
    )
});

module.exports = router;