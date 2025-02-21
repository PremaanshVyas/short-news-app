const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Short News API is running!");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
