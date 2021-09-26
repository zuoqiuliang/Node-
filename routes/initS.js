const express = require('express');
const app = express();
/**
 * app.请求方法('请求路径',处理函数)      ---静态路由 app.get('*',()=>{})  *号代表所有路径都可接收                                     )
 * app.请求方法('请求路径/:参数',处理函数) ---动态路由
 * 配置一个请求映射，如果请求方法和请求路径均满足匹配，交给回调函数进行处理
 * 回调函数参数，req和res都是被express封装过的对象
 */
app.get('/abc',(req,res)=>{
//这里会一直监听请求，比方说我们在浏览器请求了localhost:1234/abc，这里req就会收到消息
console.log(req.headers)//获取请求头
console.log(req.path)//获取请求路径
console.log(req.query)//获取请求参数，得到一个对象
console.log(req.params)//获取动态路由部分

    // 响应部分
    // res.setHeader("a","1")//手动设置响应头属性，可以设置可以不设置，用到时想到即可
    //send函数内部调用了res.end(),所以如果不调用res.send()就调用res.end()表示发送
    // res.send([{ 
    //     id:123,
    //     name:'zql'
    // }])

    // 重定向区域 3种方式
    // res.status(状态码)返回的还是res对象，可以链式编程；
    // res.status(状态码).header()返回的还是res对象，可以链式编程
    // res.status(302).header('location','https://www.baidu.com').send()//临时重定向到百度
    // res.location('https://www.baidu.com').send()//简写临时重定向
    res.redirect(302,'https://www.baidu.com')//简写到极致，直接重定向到百度
})




app.listen('1234',()=>{
    console.log('1234端口被监听了')
})

