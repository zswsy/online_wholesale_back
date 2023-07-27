const db = require('../db/index')
const utils = require('../utils/index')

//处理订单处理函数
exports.processOrderHandle=(req,res)=>{
    const id=req.params.id
    const processInfo=req.body
    const sql=`select * from orders where order_id = ?`
    db.query(sql,id,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length==0) return res.cc('订单数据未找到.......','',0)
        const sql=`update orders set ? where order_id = ?`
        db.query(sql,[{order_status:processInfo.status,process_id:processInfo.process_id},id],(err,result)=>{
            if(err) return res.cc(err,'',0)
            if(result.affectedRows!=1) return res.cc('数据更新失败......','',0)
            res.cc('物流状态更新成功....',{operate_id:processInfo.process_id,order_id:id},1)
        })
    })
    
}

//处理物流追踪处理函数
exports.trackHandle=(req,res)=>{
    const id=req.params.id
    const sql=`select track_num from orders where order_id=?`
    db.query(sql,id,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length != 1) return res.cc('订单不存在，请重试.....','',0)
        // console.log(result[0].track_num)
        // res.cc('订单获取成功',result,1)
        const track_num=result[0].track_num
        const sql=`select * from track where track_carrier_id=? order by track_id desc`
        db.query(sql,track_num,(err,result)=>{
            if(err) return res.cc(err,'',0)
            if(result.length == 0) return res.cc('物流订单不存在，请重试.....','',0)
            res.cc('物流信息获取成功',result,1)
        })
    })
}

//处理用户所有订单的处理函数
exports.getAllOrders=(req,res)=>{
    const id=req.params.id
    const sql=`select * from orders where customer_id=?`
    db.query(sql,id,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length ==0 ) return res.cc('订单不存在，请去购物中心下单吧.....','',0)
        res.cc('订单查询成功',result,1)
    })
}