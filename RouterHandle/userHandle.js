const db = require('../db/index')
//密码加密算法
const bcryptjs = require('bcryptjs')
//全局配置
const config = require('../config')
//加载token
const jwt=require('jsonwebtoken')





//用户注册注册路由
exports.reguser=(req,res)=>{
    const userInfo=req.body
    const sql='insert into users set ?'
    const newPassword=bcryptjs.hashSync(userInfo.password,config.BCRYPTJSSECRETKEY)
    console.log(newPassword)
    
    db.query(sql,[{user_name:userInfo.username,user_password:newPassword,}],(err,result)=>{
        if(err){
            res.cc(err,'',0);
            return;
        }
        if(result.affectedRows!=1){
            res.cc(err,'',0);
            return;
        }else{
            res.cc("注册成功",'dta',1);
        }
    })

    
}

//用户登录模块
exports.login=(req,res)=>{
    // console.log(req.body)
    const userInfo=req.body
    let sql = 'select * from users where user_name=? and user_is_delete != 1'
    db.query(sql,userInfo.username,(err,result)=>{
        console.log(typeof result)
        console.log(result.length)
        if(err) return res.cc(err,'',0)
        if(result.length<1) return res.cc('用户不存在，请先注册再进行登录','',0)
        else{
            for (let item = 0; item < result.length; item++) {
                const element = result[item];
                if(bcryptjs.compareSync(userInfo.password,element.user_password)){
                    //密码验证正确之后的操作
                    let user={
                        ...element,
                        user_password:'',
                    }
                    const tokenstr=jwt.sign(user,config.TOKENSCORETKEY,{expiresIn:config.EXPIRESIN})
                    return res.cc('登录成功',{token:'Bearer '+tokenstr},1)
                    
                }
            }
            return res.cc('密码错误，请重新输入','',0)
            // // console.log(result)
            // res.send('ok')
        }
    })
}

//编辑用户模块
exports.editorUser=(req,res)=>{
    // console.log(req)
    const id=req.params.id
    if(id === 'feedback'){
        const userInfo=req.body
        const id=req.body.user_id
        // console.log(typeof id)
        const sql=`update users set ?  where user_id = ?`
        db.query(sql,[{user_name:userInfo.user_name,user_age:userInfo.user_age,user_gender:userInfo.user_gender,user_phone:userInfo.user_phone,user_email:userInfo.user_email},id],(err,result)=>{
            // console.log(result)
            // console.log(sql)
            if(err) return res.cc(err,'',0)
            if(result.affectedRows!=1) return res.cc('用户信息修改失败！！！','',0)
            res.cc('用户信息修改成功','',1)
        })
    }else{
        const sql=`select * from users where user_id=? and user_is_delete <>1 `
        db.query(sql,id,(err,result)=>{
            if(err) return res.cc(err,'',0)
            if(result.length==0) return res.cc('用户不存在或者用户已删除......','',0)
            res.cc('用户数据获取成功',result[0],1);
        })
    }
}

//用户查看模块
exports.checkUser=(req,res)=>{
    const id=req.params.id
    const sql=`select * from users where user_id = ? and user_is_delete <> 1`
    db.query(sql,id,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length==0) return res.cc('用户查询失败.......','',0)
        res.cc('用户查询成功......',{...result[0],user_password:'********'},1)
    })
}

//删除用户
exports.deleteUser=(req,res)=>{
    console.log(req.body)
    const id=req.body.id
    const sql=`update users set user_is_delete = 1 where user_id = ?`
    db.query(sql,id,(err,result)=>{
        if (err) return res.cc(err,'',0)
        if(result.affectedRows !=1) return res.cc('用户数据更新失败，删除不成功....','',0)
        res.cc('用户状态更新成功，已删除.....','',1)
    })
}

//获取所有用户列表
exports.getAllUser=(req,res)=>{
    // res.send('ok')
    const sql=`select * from users where user_is_delete != 1`
    db.query(sql,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result==0) return res.cc('数据库中不存在用户，请先添加用户再试试....','',0)
        result=result.map(item=>{
             Object.assign(item,{user_password:'******'})
             Reflect.deleteProperty(item,'user_is_delete')
             return item
        })
        res.cc('数据获取成功.....',result,1)
    })
}

//添加用户、
exports.addUser=(req,res)=>{
    const userInfo=req.body
    console.log(userInfo)
    const sql =`insert into users set ?`
    db.query(sql,[{...userInfo}],(err,result)=>{
        console.log(result)
        if(err) return res.cc(err,'',0)
        if(result.affectedRows!=1) return res.cc('用户插入失败，请重试....','',0)
        res.cc('用户插入成功.....',result.insertId,1)
    })
}
