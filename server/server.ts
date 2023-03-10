var express = require('express')
var app = express();
var path= require('path')
var cors = require('cors')
var dataFunctions = require('./functions.ts')
var statusRouter = require('./routes/status.ts')
var transitionRouter = require('./routes/transition.ts')
var initialRouter = require('./routes/initial.ts')

app.use(cors())
app.use(express.json())

app.get("/labels", dataFunctions.getLabels)
app.delete("/reset", dataFunctions.reset)

app.use("/status", statusRouter)
app.use("/transition", transitionRouter)
app.use("/initial", initialRouter)

app.listen(8000,()=>{console.log("listening on 8000")})
