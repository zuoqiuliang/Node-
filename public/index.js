/**
 * 简单请求
 */

// fetch('http://localhost:1234/api/student/').then(res=>{
//    return res.json()
// }).then(res=>{
//     console.log(res)
// })


/**
 * 预检请求
 */

fetch('http://localhost:1234/api/student/',{
    method:'POST',
    headers:{
        "content-type":'application/json',
        a:1
    },
    // credentials:"include"
}).then(res=>{
       return res.json()
    }).then(res=>{
        console.log(res)
    })