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


let fs=require('fs')
let path =require('path')
fs.readFile(path.resolve( __dirname,'./src/myFile/a.txt'),(err,content)=>{
	console.log(content)
})
