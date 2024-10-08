const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
    health: {
        type: String,
        require: true,
        unique: true
    }
});

const Health =mongoose.model("health", healthSchema);
module.exports = Health;