const express = require('express')
const router = express.Router()

//导入路由处理
const productsHandle = require('../RouterHandle/productsHandle')

//导入验证规则的中间件
const expressJoi=require('@escook/express-joi')
//导入添加商品验证配置
const product_schema= require('../schema/product')

//商品路由
router.post('/add',expressJoi(product_schema.addProduct_schema),productsHandle.addProducts)
router.post('/edit/:id',productsHandle.editorProducts)
// router.post('/editor/feedback',productsHandle.editorProductsFeedback)
router.post('/check/:id',productsHandle.checkProducts)
router.get('/getAllProducts',productsHandle.getAllProducts)
router.post('/delete',productsHandle.deleteProducts)
router.post('/changeQuantity/:id',productsHandle.changeProductsQuantity)





//向外暴露
module.exports=router