const express = require("express");
const app = express();
const db = require("./db-connect");
const cors = require("cors");

/* CORS OPTIONS */
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());

const userRoute = require("./routes/user.js")
const commentsRoute = require("./routes/comments.js")
const booksRoute = require("./routes/book.js")
app.use("/user", userRoute);
app.use("/book", booksRoute);
app.use("/comment", commentsRoute);

/* Init database connection */
db.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }
});

app.listen(3000, () => console.log('[HTTP] Webserver is listening on port 3000'))