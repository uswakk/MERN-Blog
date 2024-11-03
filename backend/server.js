const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const posts = require("./postRoutes");
const users = require("./userRoutes");

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(posts); // Use a route prefix if desired
app.use(users); // Use a route prefix if desired

app.listen(PORT, () => {
    console.log("Server all setup");
    connect.connectToServer();
    console.log(`I am running perfectly on port ${PORT}`);
});
