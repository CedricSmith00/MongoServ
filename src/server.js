require("dotenv").config();
require("./db/connection")
const express = require("express");
const app = express();
app.use(express.json());

const Health = require("./db/models/bookmodel")

app.post("/health", async (req, res) => {
    console.log("req body: ", req.body);

    const result = await Health.create({
        health: req.body.health
    });
    console.log(`result: ${result}`)

    const successResponse = {
        message: "Health Successfully displayed"
    };
    res.status(201).send(successResponse);
});
 
app.get("/health", (req,res) => {res.send("API is healthy")})
 
const port = process.env.PORT;
app.listen(5001, () => {console.log(`server is listening on port ${port}`)});
