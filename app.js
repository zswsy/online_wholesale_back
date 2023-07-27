const express = require('express')
const app= express();
const Joi = require("joi")
const config= require('./config')

//允许跨域配置
const cors=require('cors');
app.use(cors());

//解析token的配置
const expressJwt= require('express-jwt')
app.use(expressJwt({secret:config.TOKENSCORETKEY}).unless({path:[/^\/reguser/,/^\/login/,/^\/ip/,/^\/hello/]}))//测试接口为hello

//设置接收form表单的数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//定义一个全局的返回中间件
app.use(function (req,res,next){
    var obj={
        status:0,
        message:'',
    }
    res.cc=function (err,data='',status=1){
        if(!status){
            obj.status=status
            obj.message=err instanceof Error ? err.message : err
            const str=JSON.stringify(obj)
            // console.log('4')
            res.send(str)
        }else{
            obj.status=status
            obj.message=err instanceof Error ? err.message : err
            obj=Object.assign(obj,{data:data?data:''})
            // console.log(obj)
            // console.log('5')
            const str=JSON.stringify(obj)
            res.send(str)
        }
    }
    next()
})


//引入用户路由
const userRouter = require('./Router/user')
app.use(userRouter)

//引入商品路由
const productsRouter = require('./Router/products')
app.use('/api/products',productsRouter)

//引入订单路由
const ordersRouter = require('./Router/orders')
app.use('/api/orders',ordersRouter)

//引入营销推广路由
const promotionsRouter = require('./Router/promotions')
app.use('/api/promotions',promotionsRouter)




// const os = require('os');
// //获取本机ip
// let getIPAdress = function() {
//     var interfaces = os.networkInterfaces();
//     for (var devName in interfaces) {
//         var iface = interfaces[devName];
//         for (var i = 0; i < iface.length; i++) {
//             var alias = iface[i];
//             if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//                 return alias.address;
//             }
//         }
//     }


// }
// let ip = getIPAdress();
// console.log('local ip:'+ip);


// app.set('trust proxy', true);// 设置以后，req.ips是ip数组；如果未经过代理，则为[]. 若不设置，则req.ips恒为[]
// app.get('/ip', function(req, res){
//     // console.log(req.headers)
//   console.log("x-forwarded-for    = " + req.header('x-forwarded-for'));// 各阶段ip的CSV, 最左侧的是原始ip
//   console.log("ips                          = " + JSON.stringify(req.ips));// 相当于(req.header('x-forwarded-for') || '').split(',')
//   console.log("remote Address     = " + req.connection.remoteAddress);// 未发生代理时，请求的ip
//   console.log("ip                            = " + req.ip);// 同req.connection.remoteAddress, 但是格式要好一些
//   res.send('Hello World');
// });









//全局的错误中间件
app.use((err,req,res,next)=>{
    if(err instanceof Joi.ValidationError){
        //表单验证错的
        return res.cc(err,'',0);
    }
    if (err.name === "UnauthorizedError") {
        //此处不适合使用res.cc的原因是因为处理请求头中的token时，res.cc还没有挂载上
        return res.send(JSON.stringify({
            status:0,
            message:'非法token---invalid token...',
        }))
      }

    next()
})

app.listen(3000,(err)=>{
    console.log('----->>>>>>>>>>>>>>     app running at port: 192.168.178.130:3000   <<<<<<<<<<<<<-------------')//默认127.0.0.1：3000
})