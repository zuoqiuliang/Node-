
const express = require('express');
const app = express();
const path=require('path');
const staticRoot=path.resolve(__dirname,'../public')
const cors=require('cors')
/**
 * 当请求时，会根据路径从指定的目录中寻找是否存在该文件，如果存在直接响应文件内容，后续中间件则不执行；
 * 如果文件不存在则移交给后续中间件处理
 * 默认情况下，如果请求的路径是一个目录，会自动使用该目录下index.html页面
 */
app.use(express.static(staticRoot))
// app.use('/static',express.static(staticRoot))
app.use(express.urlencoded({
    extended:true
}))//如果是x-www-form-urlencoded格式请求体，会将post请求中请求体的参数变成x-www-form-urlencoded格式放到下一个中间件的req.body中
app.use(express.json())//如果是json格式请求体，将请求体转换为json格式并给下一个中间件的res.body
// app.use(require('./corsAccessOrigin'))//自己写的cors跨域中间件
app.use(cors())//引用现成的cors库中的中间件

const cookieParser=require('cookie-parser');//加入cookie-parser中间件，返回值调用后返回中间件
app.use(cookieParser('加密token'))//加入之后会在req对象中注入cookies或singedCookies属性，用于所有请求传过来的cookie；会在res对象中注入cookie方法，用于设置cookie
app.use(require('./tokenMiddleware'))
// express路由
app.use('/api/student',require('./api/student'))
// app.use('/api/class',require('./api/class'))
app.use('/api/admin',require('./api/admin'))
// app.use('/api/book',require('./api/book'))


app.listen('1234',()=>{
    console.log('1234端口被监听了')
})