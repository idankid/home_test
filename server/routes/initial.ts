var express = require('express')
var router = express.Router();
var dataFunctions = require('../functions')

router.get("/", dataFunctions.getInitial)
router.put("/:init", dataFunctions.setInitial)

module.exports = router