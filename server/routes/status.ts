var express = require('express')
var router = express.Router();
var dataFunctions = require('../functions')

router.get("/", dataFunctions.getStatus)
router.post("/:name", dataFunctions.addStatus)
router.delete("/:name", dataFunctions.deleteStatus)

module.exports = router;