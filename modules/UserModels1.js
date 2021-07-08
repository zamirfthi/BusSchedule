const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    trip_id: String,
    route: String,
    time: [{type : Number}],
    day: String,
    station_name: [{type: String}],
    station_info : String
})

const UserModel1 = mongoose.model("schedules", userSchema)

module.exports = UserModel1