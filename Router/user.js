const express = require('express')
const router = express.Router()
const userHandle = require('../RouterHandle/userHandle')

//表单验证的中间件
const expressJoi=require('@escook/express-joi')
const {reguser_schema,addUser_schema}=require('../schema/user')

//用户注册
router.post('/reguser',expressJoi(reguser_schema),userHandle.reguser);
router.post('/login',userHandle.login)
router.post('/api/users/edit/:id',userHandle.editorUser)
router.post('/api/users/check/:id',userHandle.checkUser)
router.post('/api/users/delete',userHandle.deleteUser)
router.post('/api/users/getAllUser',userHandle.getAllUser)
router.post('/api/users/addUser',expressJoi(addUser_schema),userHandle.addUser)
//测试接口
router.get('/hello',function (req,res){
    res.send('ok--测试接口')
})

//向外暴露
module.exports=router
