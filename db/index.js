const mysql = require("mysql")
const db = mysql.createConnection({
    host:'xxx.xxx.xxx.xxx',
    user:'xxxx',
    password:'xxxxx',
    database:'online_wholesale',
})

        

//连接数据库
db.connect(err=>{
    if(err) throw err;
    console.log("connect successfully as id "+db.threadId);
    
})


//向外暴露
module.exports=db