const express = require("express");
const bodyParser = require("body-parser")
const importData = require("./data.json")
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

//GET
app.get("/students", (req, res) => {
  res.send (importData);
});

//POST
app.post("/schedule", async (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log("Started listening on port http://localhost:5000")
})
