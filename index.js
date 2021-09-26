// setTimeout(()=>{
//     console.log(123)
// },1000)


// process.exit()

// console.log(process.argv)
// console.log(process.kill(3752))

// console.log(process.env.ComSpec)
// require('D:\\Node学习\\node\\src')
// require('./src')
// require('./src')
// console.log('package中的main字段找到了index.js')

// require('./src/index.js')
// console.log(require)
// console.log( require.resolve('./src/index.js') )
// let a=require('os')
// console.log(a.cpus().length)

// console.log(a.homedir())
// console.log(a.hostname())
// console.log(a.tmpdir())


// let path=require('path')

// console.log(path.basename(__filename))
// console.log(path.basename( 'kdsanl/dskldn/ksdol' ))
// console.log(path.basename('dnjs/djsk/a.html','.html'))
// console.log(path.sep)
// console.log(process.env.Path.split(path.delimiter))

// console.log(path.dirname(',dlsmlk/dsmkn/dxmsk'))
// console.log(path.extname('dsnj/jdska/m.html'))
// console.log(path.join('a','b','../','d.js'))
// console.log(path.relative('a/b','a/c'))

// console.log(path.resolve(__dirname,'hujhkj.js'))

// let url=require('url')
// let urlobj=new url.URL('http://school.njcedu.com/#/trainingCourse?id=21540000010')


// console.log( urlobj.searchParams)

// const obj={
//   href: 'http://school.njcedu.com/#/trainingCourse?id=21540000010',
//   origin: 'http://school.njcedu.com',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'school.njcedu.com',
//   hostname: 'school.njcedu.com',
//   port: '',
//   pathname: '/',
//   search: '',
//   hash: '#/trainingCourse?id=21540000010' }

// 	console.log(url.format(obj))


// let util=require('util')

// let obj1={
// 	a:{
// 		b:{
// 			a:1
// 		}
// 	}
// }

// let obj2={
// 	a:{
// 		b:{
// 			a:1
// 		}
// 	}
// }

// console.log(util.isDeepStrictEqual)


// let fs=require('fs')
// let path =require('path')
// fs.readFile(path.resolve( __dirname,'./src/myFile/a.txt'),(err,content)=>{
// 	console.log(content)
// })
// fs.writeFile(path.resolve( __dirname,'./src/myFile/hs'),'写入的字',{
// 	flag:'a'
// },()=>{
// 	console.log(222)
// })

// fs.createReadStream(path.resolve( __dirname,'./src/myFile/a.txt'),{
// 	encoding:'utf-8',
// 	// start:
// 	// end:
// 	highWaterMark:64*1024

// })
// fs.createWriteStream()


// let net=require('net')
// net.createConnection()
// net.createServer()

// let http=require('http')
// let request=http.request('http://yuanjin.tech:5005/api/movie',(resp)=>{
//     console.log(resp.statusCode,resp.headers)//得到相应状态码和响应头
//     let str=''
//     resp.on('data',(chunk)=>{
//        str+= chunk.toString('utf-8')
//     })
//     resp.on('end',()=>{
//         console.log(JSON.parse( str ))
//     })
// })
// request.end()//表示get请求没有请求体直接就可以发送了，告诉服务器不用等了，可以返回响应数据了


// let http=require('http')
// let server=http.createServer((resp)=>{
//     //这里监听有没有请求来了
//   console.log(  resp.url )
// })

// server.listen({
//     host: 'localhost',
//   port: 80,
//   exclusive: true
// })

// server.on('listening',()=>{
//     console.log(123466)
// })





// const sequelize=require('./models/sync')

// async function test() {
//     try {
//         await sequelize.authenticate(); //该方法用来测试连接
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// test()


// const Admin=require('./models/admin');
// let adn=Admin.build({
//     loginId:'111111',
//     loginPwd:'123456',
//     name:'zql'
// })
// adn.save().then(()=>{
//     console.log('添加admin表数据成功了')
// })


// const adminService=require('./services/adminService');

// adminService.addAdmin({
//     loginId:'18232249132',
//     loginPwd:'123456',
//     name:'左'
// }).then((res)=>{
//     console.log(res)
// })
// adminService.updateAdmin(5,{
//     loginPwd:'123456'
// })
// adminService.deleteAdmin(1);
// adminService.updateAdmin(2)


// const classService=require('./services/calssService');
// classService.addClass(3)
// classService.deleteClass(1)
// classService.updateClass(2,{
//     name:'网2',
//     openDate:'2017-09-02'
// })

// const studentService=require('./services/studentService')
// studentService.addStudent(1)
// studentService.deleteStudent(1)
// studentService.updateStudent(2,{
//     name:'李好',
//     birthday:'2000-10-01',
//     sex:true,
//     mobile:'15071523698'
// })


// const Book = require('./models/Book');
// const bookService=require('./services/bookService');

// // bookService.addBook(2);
// bookService.updateBook({
//     author:'于浩东'
// },2)



// const Class=require('./models/Class')
// const Student=require('./models/Student')

// Class.hasMany(Student);
// Student.belongsTo(Class)
// require('./mock/mockStudent')

// const adminServices=require('./services/adminService');

// adminServices.login('18232249132','123456').then(res=>{
//     console.log(res)

// })

// adminServices.getAdminById(2).then(res=>{
//     console.log(res)
// })


// const stuServices=require('./services/studentService');
// // stuServices.getAllStudents().then(res=>{
// //     console.log(res)
// // })

// stuServices.getAllStudents(1,10,1).then(res=>{
//     console.log(res)
// })


// const md5=require('md5');

// console.log(md5('dsacsdavc 定位尺寸' ))


// const moment=require('moment');

// console.log(moment.utc().toString())

// console.log(moment().valueOf())
// console.log(moment.utc().valueOf())

// const format=['YYYY-MM-DD HH:mm:ss','YYYY-M-D H:m:s','x'];// 数组中填写支持哪些令牌日期格式
//  console.log(+moment.utc('1970-01',format,true))
//  console.log(moment.utc('1970-1-1 00:00:00',format,true).toString())
//  console.log(moment.utc('0',format,true).toString())

// const m= moment.utc()
// console.log(m.toString())
// console.log(m.local().format('YYYY-MM-DD HH:mm:ss'))

// const a= moment().valueOf();
// const m=moment.utc(a)
// console.log(m.format('YYYY-MM-DD HH:mm:ss'))

// const m=moment.utc('2021-09-08 07:30:00')
// console.log(m.local().fromNow())

// require('./services/init')
// const stuServices=require('./services/studentService');
// stuServices.addStudent({//这里调用增加学生记录的方法
//     name: '左亮亮',
//     birthday: '1999-9-19',
//     sex: true,
//     mobile: '13715894568',
//     classId:'12'
// })

//  stuServices.getAllStudents().then(res=>{
//      console.log(res)
//  })





require('./init')