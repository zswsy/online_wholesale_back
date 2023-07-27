const express = require('express')
const router = express.Router()

const ordersHandle=require('../RouterHandle/ordersHandle')

//路由
router.post('/process/:id',ordersHandle.processOrderHandle)
router.post('/track/:id',ordersHandle.trackHandle)
router.post('/getAllorders/:id',ordersHandle.getAllOrders)

module.exports=router