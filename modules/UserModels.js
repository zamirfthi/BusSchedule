const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    bus_id: String,
    capacity: Number,
    driver_id: String,
    driver_name: String,
    route: String
})

const UserModel = mongoose.model("information", userSchema)

module.exports = UserModel