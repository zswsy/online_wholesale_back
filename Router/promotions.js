const express = require('express')
const router = express.Router()

const promotionsHandle = require('../RouterHandle/promotionsHandle')

router.post('/addHighlight',promotionsHandle.addHighlightProducts)

module.exports=router
