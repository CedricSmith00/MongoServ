const mongoose = require("mongoose");

async function connection () {
    try {
        await mongoose.connect(process.env.mongo_URI);
        console.log("successfully connected to the database.")
    } catch (error) {
        console.log(error);
    }
};

connection();