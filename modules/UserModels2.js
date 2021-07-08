const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    station_id: String,
    station_name: String,
    bus_id: String,
})

const UserModel2 = mongoose.model("destinations", userSchema)

module.exports = UserModel2