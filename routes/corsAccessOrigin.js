// 自己手写的cors中间件，用来做客户端跨域的处理

const list=[
    "null",
    'http://127.0.0.1:5500'
]

module.exports=function(req,res,next){
    if(req.method==='OPTIONS'){
        console.log(req.headers) 
        res.header(
            "Access-Control-Allow-Origin",req.headers.origin,
           
        )
        res.header(
            "Access-Control-Allow-Methods",req.headers["access-control-request-method"],
           
        )
        res.header(
            
            "Access-Control-Allow-Headers",req.headers["access-control-request-headers"]
        )
        
    }
    // res.header(
            
    //     "Access-Control-Allow-Credentials",true
    // )
    if('origin' in req.headers && list.includes(req.headers.origin)){
        res.header('access-control-allow-origin',req.headers.origin)
    }
    next()//这里一定要执行next()，因为跨域中间件只是处理响应头的属性，响应内容交给后续中间件处理
}