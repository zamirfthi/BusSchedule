const app = require("express")()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const UserModel = require("./modules/UserModels")
const UserModel1 = require("./modules/UserModels1")
const UserModel2 = require("./modules/UserModels2")

//connect mongodb
mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.smxew.mongodb.net/Bus?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log("connect to mongodb")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

//POST SCHEDULES
app.post("/schedules", async (req, res, next) => {
    try{
        const user = await UserModel1.create({
            trip_id: req.body.trip_id,
            route: req.body.route,
            time: req.body.time,
            day: req.body.day,
            station_name: req.body.station_name
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//POST DESTINATION
app.post("/schedules/destinations", async (req, res, next) => {
    try{
        const user = await UserModel2.create({
            station_id: req.body.station_id,
            station_name: req.body.station_name,
            bus_id: req.body.bus_id
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//POST INFORMATION
app.post("/schedules/destinations/information", async (req, res, next) => {
    try{
        const user = await UserModel.create({
            bus_id: req.body.bus_id,
            capacity: req.body.capacity,
            driver_id: req.body.driver_id,
            driver_name: req.body.driver_name
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET SCHEDULES
app.get("/schedules", async (req, res, next) => {
    try{
       const result = await UserModel1.find(req.params)
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET DESTINATION
app.get("/schedules/destinations", async (req, res, next) => {
    try{
       const result = await UserModel2.find(req.params)
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET INFORMATION
app.get("/schedules/destinations/information", async (req, res, next) => {
    try{
       const result = await UserModel.find(req.params)
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET SCHEDULES BY ROUTE
app.get("/schedules/:route", async (req, res, next) => {
    try{
       const result = await UserModel1.find(req.params)
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET SCHEDULE BY ROUTE & DESTINATION BY STATION NAME
app.get("/schedules/:route/destinations/:station_name", async (req, res, next) => {
    try{
       const result = await UserModel1.aggregate([
        {
            "$match":{
                "route":req.params.route
            }
        },
        {
            "$unwind":"$station_name"
        },
        {
            "$lookup":{
               "from":"destinations",
               "localField":"station_name",
               "foreignField":"station_name",
               "as":"station_info"
            }
        },
        {
            "$match":{
                "station_name":req.params.station_name
            }
        },
        {
            "$project":{"station_info":1,"_id":0}
        }
      ])
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//GET INFROMATION BY BUS_ID
app.get("/schedules/:route/destinations/:station_name/information/:bus_id", async (req, res, next) => {
    try{
       const result = await UserModel1.aggregate([
        {
            "$match":{
                "route":req.params.route
            }
        },
        {
            "$unwind":"$station_name"
        },
        {
            "$lookup":{
               "from":"destinations",
               "localField":"station_name",
               "foreignField":"station_name",
               "as":"station_info"
            }
        },
        {
            "$match":{
                
                "station_info.station_name":req.params.station_name
            }
        },
        {
            "$lookup":{
               "from":"information",
               "localField":"station_info.bus_id",
               "foreignField":"bus_id",
               "as":"bus_info"
            }
        },
        {
            "$match":{
                
                "bus_info.bus_id":req.params.bus_id
            }
        },
        {
            "$project":{"bus_info":1,"_id":0,"bus_info.station_id":0}
        }
      ])
       res.json(result)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})



//PUT SCHEDULES
app.put("/schedules/:trip_id", async (req, res, next) => {
    try{
        const user = await UserModel1.findOneAndUpdate({trip_id: req.params.trip_id}, {
            trip_id: req.body.trip_id,
            route: req.body.route,
            time: req.body.time,
            day: req.body.day,
            station_name: req.body.station_name
        },{
            new: true,
            useFindAndModify: false
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//PUT DESTINATION
app.put("/schedules/destinations/:station_id", async (req, res, next) => {
    try{
        const user = await UserModel2.findOneAndUpdate({station_id: req.params.station_id}, {
            station_id: req.body.station_id,
            station_name: req.body.station_name,
            bus_id: req.body.bus_id
        },{
            new: true,
            useFindAndModify: false
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//PUT INFORMATION
app.put("/schedules/destinations/information/:bus_id", async (req, res, next) => {
    try{
        const user = await UserModel.findOneAndUpdate({bus_id: req.params.bus_id}, {
            bus_id: req.body.bus_id,
            capacity: req.body.capacity,
            driver_id: req.body.driver_id,
            driver_name: req.body.driver_name
        },{
            new: true,
            useFindAndModify: false
        })
        res.json(user)
    } catch(e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//DELETE SCHEDULE
app.delete("/schedules/:trip_id", async (req, res, next) => {
    try{
        const result = await UserModel1.deleteOne({trip_id: req.params.trip_id})
        res.json(result)
    } catch(e){
        next(e)
    }
})

//DELETE DESTINATION
app.delete("/schedules/destinations/:station_id", async (req, res, next) => {
    try{
        const result = await UserModel2.deleteOne({station_id: req.params.station_id})
        res.json(result)
    } catch(e){
        next(e)
    }
})

//DELETE INFORMATION
app.delete("/schedules/destinations/information/:bus_id", async (req, res, next) => {
    try{
        const result = await UserModel.deleteOne({bus_id: req.params.bus_id})
        res.json(result)
    } catch(e){
        next(e)
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Started listening on port http://localhost:5000');
});