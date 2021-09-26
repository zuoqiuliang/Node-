const {sendError,getResult}=require('./getSendResult')
const {pathToRegexp}=require('path-to-regexp')//将路径转换成正则，验证路径
function handleNonToken(req,res,next){
    res.send(sendError('未登录，请登录后再试',403))
}

const needRegexp=[
    {method:'POST',path:'/api/student'},
    {method:'PUT',path:'/api/student/:id'},
]

module.exports=(req,res,next)=>{
    const apis=needRegexp.filter((item)=>{
        const reg=pathToRegexp(item.path)
        console.log(reg.test(req.path)+'1212121')
       return item.method===req.method&&reg.test(req.path)
    })
    if(apis.length===0){
        next()
        return
    }
    let token=req.signedCookies.token;
    console.log(req.cookies)
    if(!token){
        token=req.headers.authorization;//表示是除浏览器外的设备，从req.headers.authorization中获取
    }
    if(!token){//如果还没有token表示第一次访问
        handleNonToken(req,res,next)
        console.log('认证未通过')
        return
    }
    next()//如果验证通过移交给下一个中间件
    console.log('认证通过')
}