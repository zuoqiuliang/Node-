[TOC]

## Node全局对象
  1. setTimeout
  2. setInterval
	3. setImmediate(类似于setTimeout0)
	4. console
	5. __dirname(获取代码所在当前模块（文件夹）所在的路径；非global属性)
	6. __filename(获取代码所在当前模块（文件）所在的路径；非global属性)
	7. Buffer
	8. process  中文意思是进程的意思
		- cwd()  返回输入node命令时终端命令行路径
		- exit()  删除、退出一个进程
		- argv()  获取终端中命令行参数
		- platform()  获取当前的操作系统
		- kill(pid)  杀死进程 传入进程id即可杀死进程,id每次是不固定的，每次启动程序时自动分配的
		- env   获取环境变量对象
## 基本内置模块
1. os
   1. EOL
   2. arch()
   3. cpus() 获取本机cpu的一些信息，如i7、4核
   4. homedir() 获取本机用户目录
   5. hostname() 获取主机名
   6. tmpdir() 获取操作系统的临时目录
2. path   
   > path中的方法、属性都不会真实从计算机中找文件，开发者自定义的就行
   1. basename('文件路径','后缀名')  获取文件全名包含文件后缀，第二个参数可选，如果匹配上则不显示后缀名，匹配不上就显示文件后缀
   2. sep:得到分隔符号 \
   3. delimiter  windows系统上是 ; 号作为分隔符，不同系统不一样
   4. dirname(目录路径) 获取传入目录路径
   5. extname(文件路径) 获取文件后缀名
   6. join(多段路径逗号分割) 将多段路径拼接成一个完整的路径，拼接好的路径分隔符为系统默认分隔符
   7. relative(路径1，路径2) 得到路径2相对于路径1的路径 ，就是在路径1怎么找到路径2
   8. resolve(自定义路径) 得到绝对路径,是终端输入node命令时的路径，如果想要固定当前模块所在目录 在第一个参数写 __dirname即可，resolve方法会拼接参数
3. URL
  > let a=require('url') let url= a.URL(浏览器地址路径)返回一个对象， 使用时new url.URL(浏览器地址路径)
  1. url.searchParams 获取地址参数
  2. a.format(解析的对象) 转换成一个字符串地址

4. util
   1. callbackify 传入一个promise的函数，返回一个回调函数
   2. promisify
## Node模块化细节
### require(路径)，模块的查找
  1. 绝对路径：  根据绝对路径直接加载模块(其他路径书写最终都会转成绝对路径)
  2. 相对路径：./或../  :导入时相对于当前模块，再转换为绝对路径最终加载模块
  3. 相对路径：没有./或../开头的
       1. 首先检查是不是内置模块，如fs、path等，如果是内置模块则不加载，如果不是则继续
       2. 检查当前目录中是否有node_modules模块，在node_modules中找
       3. 检查上级目录中是否有node_modules模块，在node_modules中找
       4. 找到后转换为绝对路径
       5. 加载模块
       6. 如果找不到就报错
  4. 关于后缀名：如果不提供后缀名则自动补全，优先级顺序为js、json、node、mjs
  5. 关于文件名：
     1. 如果仅提供目录：自己写的文件 如require(./src)不提供文件名，则自动寻找该目录中的index.js文件;
     2. 如果仅提供目录:导入第三方包或执行包时若只提供目录如require(abc) 或 在终端执行node ./，则使用main字段(默认为index.js)作为入口
  >总结：1. 如果引入自己写的模块如require(./src)，但是没有文件后缀，那么会先依次按顺序为js、json、node、mjs补全当成文件来找，如果没找到则当成一个文件夹寻找该目录中的index.js文件 2. 如果引入的路径没有./或者../则表示是第三方包，那么会从node_modules下先按照文件找，依次加上js、json、node、mjs后缀，如果按文件找没找到则按文件夹找，正常是直接看该文件夹下的index.js文件,由于是第三方包，所以按照这个第三方包的package.json的main字段找

### module对象
 记录当前模块的信息
### require函数
require.resolve('相对路径')：会转成绝对路径

## 文件 I / O :input output
 > 对外部设备的输入输出叫做IO； 外部设备:磁盘、网卡、显卡、打印机、其他...； IO的速度往往低于内存和CPU的交互速度

### fs模块
1. fs.readFile(绝对路径，配置，回调函数)  ：读取一个文件，第二个人参数配置可以是一个对象也可以是一个字符串如
   ```javascript
    let fs=require('fs')
    let path =require('path')
    fs.readFile(path.resolve( __dirname,'utf-8',./src/myFile/a.txt'),(err,content)=>{
      console.log(content)
    })
    就会读出文件中的字符串内容了
   ```
fs.readFile的参数需要异步回调是因为读文件是IO，由于IO的速度往往低于内存和CPU的交互速度，所以需要时间 用一个异步回调函数
