const express=require('express')
const adminRouter=express.Router()
const adminServer=require('../../services/adminService')
const {sendError,getResult}=require('../getSendResult')

adminRouter.post('/login',async (req,res)=>{
  const result= await adminServer.login(req.body.loginId,req.body.loginPwd)
   if(result){
       const value=result.id
    //由于浏览器喜欢cookie,因为cookie在浏览器自动存储、自动发送；其他终端不支持cookie，支持header，所以有一个不成文规定，浏览器使用cookie，其他终端使用header
       res.cookie('token',value,{
           path:'/',
           domain:'localhost',
           maxAge:1000*60*60,//毫秒数
            httpOnly:true,
            signed:true//如果设置了这个属性，在req中获取cookie时应是req.signedCookies.cookie名
       })
    // 适配其他终端，如智能手表等乱七八糟的
       res.header('authorization',value)
   }
  res.send(getResult(result))

})



module.exports=adminRouter 