const router = require("express").Router();
const db = require('../db-connect');

router.get("/", (req, res) => {
    const mongo = db.getDb();
    mongo.collection("books").find().toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const startIndex = (parseInt(req.query._page) - 1) * parseInt(req.query._limit);
            const endIndex = (parseInt(req.query._page)) * parseInt(req.query._limit);

            res.status(200).json({
                total: result.length,
                books: result.slice(startIndex, endIndex)
            });
        }
    });
});

router.get("/search/:title", (req, res) => {
    //return a book
    const mongo = db.getDb();
    mongo.collection("books").find({ title: new RegExp(req.params.title) }).toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const startIndex = (parseInt(req.query._page) - 1) * parseInt(req.query._limit);
            const endIndex = (parseInt(req.query._page)) * parseInt(req.query._limit);

            res.status(200).json({
                total: result.length,
                books: result.slice(startIndex, endIndex)
            });
        }
    });
});

router.get("/category/:category", (req, res) => {
    //return a book
    const mongo = db.getDb();
    mongo.collection("books").find({ categories: req.params.category }).toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const startIndex = (parseInt(req.query._page) - 1) * parseInt(req.query._limit);
            const endIndex = (parseInt(req.query._page)) * parseInt(req.query._limit);

            res.status(200).json({
                total: result.length,
                books: result.slice(startIndex, endIndex)
            });;
        }
    });
});

router.get("/author/:author", (req, res) => {
    //return a book
    const mongo = db.getDb();
    mongo.collection("books").find({ authors: req.params.author }).toArray(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const startIndex = (parseInt(req.query._page) - 1) * parseInt(req.query._limit);
            const endIndex = (parseInt(req.query._page)) * parseInt(req.query._limit);

            res.status(200).json({
                total: result.length,
                books: result.slice(startIndex, endIndex)
            });
        }
    });
});

module.exports = router;
