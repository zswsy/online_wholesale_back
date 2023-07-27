const { number, expression } = require('joi')
const db=require('../db/index')



//添加商品处理函数
exports.addProducts=(req,res)=>{
    const sql='insert into products set ?'
    const productsInfo=req.body
    db.query(sql,[{
                    product_name:productsInfo.product_name,
                    product_price:productsInfo.product_price,
                    product_description:productsInfo.product_description,
                    product_quantity:productsInfo.product_quantity,

                }],(err,result)=>{
                    // console.groupCollapsed(result)
                    if(err) return res.cc(err,'',0)
                    if(result.affectedRows!=1) return res.cc('商品插入失败啊','',0)
                    res.cc('商品插入成功',result.insertId,1)
                })
}

//编辑商品的处理函数
exports.editorProducts=(req,res)=>{
    let id=req.params.id;
    if(id === 'feedback'){
        const productsInfo=req.body
        const id=req.body.product_id
        // console.log(typeof id)
        const sql=`update products set ?  where product_id = ?`
        db.query(sql,[{product_name:productsInfo.product_name,product_price:productsInfo.product_price,product_description:productsInfo.product_description,product_quantity:productsInfo.product_quantity,},id],(err,result)=>{
            // console.log(result)
            // console.log(sql)
            if(err) return res.cc(err,'',0)
            if(result.affectedRows!=1) return res.cc('商品修改失败！！！','',0)
            res.cc('商品修改成功','',1)
        })
    }else{
        const sql='select * from products where product_id=?'
        db.query(sql,id,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length!=1) return res.cc('商品不存在，请重新选择--','',0)
        res.cc('数据查询成功',result[0],1)
    })
    }
}

//查看单件商品的处理函数
exports.checkProducts=(req,res)=>{
    let id=req.params.id;
    const sql='select * from products where product_id=?'
    db.query(sql,id,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length!=1) return res.cc('商品不存在，请重新选择--','',0)
        res.cc('数据查询成功',result[0],1)
    })
}

//查看所有商品的处理函数
exports.getAllProducts=(req,res)=>{
    const sql='select * from products'
    db.query(sql,0,(err,result)=>{
        if(err) return res.cc(err,'',0)
        if(result.length==0) return res.cc('您的仓库中不存在商品，','',0)
        let arr=Object.values(result);
        arr=arr.filter(item=>{
           return item.product_is_delete!=1
        })
        res.cc('数据查询成功',arr,1)
    })
}

//删除商品的处理函数
exports.deleteProducts=(req,res)=>{
    const id=req.params.id
    const sql=`update products set product_is_delete=1 where product_id=?`
    db.query(sql,id,(err,result)=>{
        console.log(result)
        if(err) return res.cc(err,'',0)
        if(result.affectedRows!=1) return res.cc('商品删除失败，请重试')
        res.cc('商品商品删除成功！！！','',1)
    })
}

//修改商品库存的处理函数
exports.changeProductsQuantity=(req,res)=>{
    const id=req.params.id
    const quantity=req.body.product_quantity
    const sql=`update products set product_quantity= ? where product_id=?`
    db.query(sql,[quantity,id],(err,result)=>{
        console.log(result)
        if(err) return res.cc(err,'',0)
        if(result.affectedRows!=1) return res.cc('商品库存更新失败失败，请重试')
        res.cc('商品库存更新成功！！！','',1)
    })
}