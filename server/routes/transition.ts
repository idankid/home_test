var express = require('express')
var router = express.Router();
var dataFunctions = require('../functions')

router.get("/", dataFunctions.getTransitions)
router.post("/", dataFunctions.addTransition)
router.delete("/:name", dataFunctions.deleteTransition)

module.exports = router