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
> fs模块中绝大多数都是异步的，跟磁盘打交道，基本每个fs的api都会提供一个同步的api(如fs.readFileSync)但是一般不要使用，否则代码会卡着,通常在程序启动时运行有限次数即可 如我们写好的node程序初始化操作。
1. fs.readFile(绝对路径，配置，回调函数)  ：读取一个文件，第二个参数配置可以是一个对象也可以是一个字符串如
   ```javascript
    let fs=require('fs')
    let path =require('path')
    fs.readFile(path.resolve( __dirname,'utf-8',./src/myFile/a.txt'),(err,content)=>{
      console.log(content)
    })
    就会读出文件中的字符串内容了
   ```
   fs.readFile的参数需要异步回调是因为读文件是IO，由于IO的速度往往低于内存和CPU的交互速度，所以需要时间 用一个异步回调函数
   - fs.promises.readFile(绝对路径，配置) :读取一个文件 返回一个promise，这个api就没有第三个参数了，只有在后面then即可
2. fs.writeFile(绝对路径，写入的内容，{flag:'a'},回调函数) 写入一个文件内容，如果没有文件会自动创建要写的文件，第三个参数代表在后面追加内容不是覆盖
   - 也是有对应writeFileSync同步api的
   - 也是有fs.promises.writeFile异步promise的api的
3. fs.stat(目录路径)  获取文件或目录信息
4. fs.readdir(目录路径)  得到一个目录的子文件/目录，仅仅得到子的文件/目录孙子文件/目录得不到，返回一个数组
5. fs.mkdir(创建的目录绝对路径)
6. fs.exists(目录路径) 判断文件或目录是否存在
7. fs.unlink(文件路径) 删除文件

### 文件流
> 1. 什么是流？ 流是指数据的流动，数据从一个地方缓缓地流动到另一个地方
> 2. 流是有方向的
     - 可读流 readable :数据从源头流向内存
     - 可写流 writable:数据从内存流向源头，如我们从内存里往文件中写东西
     - 双工流 Duplex：数据即可从源头流向内存又可从内存流向源头
>3. 为什么需要流？
   - 其他存储比如磁盘硬盘的存储空间和内存的不一样，内存的比较小
   - 其他存储比如硬盘和内存的数据处理能力不一样，内存处理数据速度非常快

**文件流**
   1. 什么是文件流？ 文件流是内存数据和磁盘文件之间的流动
   2. 可读流的创建：let rs=fs.createReadStream(读取的文件路径，{
         encoding:'utf-8',
         start: 2,//开始字节下标
          end:20,//结束字节下标
         highWaterMark:64*1024  //读取最高字节数，也可配置成数字表示读几个字节，如果配置类encoding为utf-8则中文也是一个字节，如果没有配置则按照Buffer读取
      })  返回一个Readable的子类ReadStream
      > 文件流的事件 rs.on(事件名，处理函数)
      1. open事件  文件打开事件
      2. error事件 文件找不到报错事件
      3. close事件 文件读取完关闭事件
      4. data事件  按照highWaterMark配置读取文件一部分数据后触发，每次读取highWaterMark指定的数量，回调函数中会附带读取到的数据
      5. end事件  文件读完事件
      > 文件流可读流的方法
      1. rs.pause() 暂停读取会触发pause事件
      2. rs.resume() 恢复读取会触发resume事件
   3. 写入流的创建：let ws= fs.createWriteStream(写入的文件路径，{
         encoding:'utf-8',
         start: 2,//开始字节下标
         highWaterMark:2，//默认值为16*1024 即16kb;
         })
        > 1Mb=1024Kb,1kb=1024字节，1个中文=3字节，1个英文=1字节
      1. open事件  文件打开事件
      2. error事件 文件找不到报错事件
      3. close事件 文件读取完关闭事件
      >文件流中写入流的方法
      1. ws.write(data)  写入数据，data可以是字符串或者Buffer，该方法返回一个布尔值，如果写入的内容数量大于等于highWaterMark配置的值则返回值为false,如果写入数量小于配置的highWaterMark值则返回值为true。**highWaterMark是写入队列 可以想象成超市搞活动的通道，写入流会有背压问题**
      2. ws.drain() 当写入队列清空时，会触发该事件，即表示可以继续写了
      3. ws.end() 结束写入，将自动关闭文件
   4. rs.pipe(写入流) 将可读流连接到可写流，该方法可解决写入流的背压问题
### net模块
1. 创建客户端 (node作为客户端，请求其他服务器)
net.createConnection({
   host:'duyi.ke.qq.com',//主机名
   port:80,//端口号
},()=>{

}})
2. 创建服务器 (node作为服务端)
net.createServer()，返回一个scoket对象
   scoket的事件
   1. connection事件，表示有客户端连接到服务器了
   2. listen(端口号)事件，表示监听端口号
   3. listening事件，表示服务器正在监听端口
### http模块
> http模块建立在net模块之上，无需手动管理scoket，无需手动组装消息格式

 
1. node作为客户端向其他服务器发送请求
   let request=http.request(url地址，{
      method:'GET'//请求配置，类似于浏览器中用到的ajax、axios配置
   },(resp)=>{
      console.log(resp)//resp是一个可读流，里面有很多属性
   })
   返回的一个对象，调用request.end()表示发送消息体即写完了，不然服务器一直等着发消息体就不会给客户端响应，最终导致客户端一直等着

   ```javascript
   1.这是请求的渡一官网
   let http=require('http')
   let request=http.request('http://www.duyiedu.com/',(resp)=>{
      console.log(resp.statusCode,resp.headers)//得到相应状态码和响应头
      let str=''
      resp.on('data',(chunk)=>{
         str+= chunk.toString('utf-8')
      })
      resp.on('end',()=>{
         console.log(str)
      })

   })
   request.end()//表示get请求没有请求体直接就可以发送了，告诉服务器不用等了，可以返回响应数据了


   2.这是请求的袁老师的网站
   let http=require('http')
   let request=http.request('http://yuanjin.tech:5005/api/movie',(resp)=>{
      resp叫做incomingMessage对象，就是别人给我的就是这个对象
      console.log(resp.statusCode,resp.headers)//得到相应状态码和响应头
      let str=''
      resp.on('data',(chunk)=>{
         str+= chunk.toString('utf-8')
      })
      resp.on('end',()=>{
         console.log(JSON.parse( str ))
      })
   })
   request.end()//表示get请求没有请求体直接就可以发送了，告诉服务器不用等了，可以返回响应数据了
   
   
   ```


2. node作为服务端搭建服务器
   ```javascript
      let server=require('http')
      let server=server.createServer((req,res)=>{
         //这里监听有没有请求来了
      console.log(  req.url )
      req是可读流，res是可写流
      res就是ServerResponse对象
      res.setHeader(设置响应头)
      res.write(响应体)
      res.end()//表示写完了
   })

   ```
   1. listen(端口号)事件，表示监听端口号
   2. listening事件，表示服务器正在监听端口


**总结**
> node是客户端时，请求的对象是ClientRequest对象，响应的对象是InComingMessage对象；
> node是服务器时，请求的对象是InComingMessage对象，响应的对象是ServerResponse对象；

### https
**https保证数据在传输过程不被窃取和篡改，从而保证传输安全**
 方式：加密
1. 对称加密：产生一个密钥，通过算法将密钥和原信息进行加密，也可以用算法和加密过后的信息进行解密,但是这种情况在第一次传输数据时有可能黑客把密钥拿到并且篡改，这还是解决不了窃取和篡改问题
   > 原信息：(明文，就像账号密码)
   > 加密过后的信息：(乱七八糟的看不懂的信息)

   加密过程：原信息+密钥=加密过后的信息(乱七八糟的看不懂的信息)
   解密过程：加密过后的信息+密钥=原信息
   常用算法：DES、3DES、AES、Blowfish等
2. 非对称加密：产生一对密钥，一个用于加密，一个用于解密，但是还有被黑客在第一次服务器向客户端传输公钥时篡改窃取的可能，还是不能完全加密
   加密过程：原信息+公钥=加密过后的信息(乱七八糟的看不懂的信息)
   解密过程：加密过后的信息+私钥=原信息
   常用算法：RSA、Elgamal、Rabin、D-H、ECC等
3. 证书颁发机构(CA)
   - 证书组成：CA服务器网址+证书颁发机构+自己请求的服务器公钥+证书签名
   由于证书中自己请求的服务器公钥、证书签名是通过CA的私钥加密的，所以只能通过CA的公钥解密，但是无法重新加密改造
   - 证书签名包含：CA服务器网址+CA公钥+自己请求的服务器公钥 三者通过算法生成证书签名
      > 证书签名的算法是公开的，证书签名出现的目的就是为了让每一个拿到证书的终端，可以验证证书是否被篡改

 - 总结：加密需要CA证书与对称加密联合才可以
  1. 第一步服务器申请证书
  2. 第二步浏览器从服务器拿CA证书，通过CA证书中证书颁发机构获取CA公钥，计算机本记录很多证书颁发机构的公钥可以很快找到，那么就可以利用CA公钥解开自己请求的服务器公钥+证书签名
  3. 第三步浏览器验证CA证书，证书验证算法需要的三个条件都满足了就可以计算验证了
  4. 第四步浏览器生成对称加密与自己想要通信的服务器进行通信数据

### node的生命周期

**事件循环**

1. timers队列:存放计时器的回调函数
2. poll队列：除了timers队列和checks队列中的内容，其他的绝大多数回调都放入该队列，比如 文件的读取、监听用户请求 
   - 运作方式：1.如果poll队列中有回调，依次执行回调，直到清空队列
              2. 如果poll队列中没有回调，等待其他队列中出现回调，结束该阶段进入下一阶段；如果其他队列中没有回调则持续等待直到出现回调为止
 
   ```javascript
   监听用户请求的回调就会放入poll队列中
      http.createServer((resp)=>{
         //这里监听有没有请求来了
      console.log(  resp.url )
      })
   ```
3. check队列：检查阶段
   使用setImmediate的回调会直接进入check队列，不像timers队列需要判断时间到没到来消耗时间

事件循环中每次打算执行某个回调前必须要先清空nextTick队列和promise这两个微队列;nextTick优先于promise执行，nextTick是最快执行的队列其次是promise队列

## MySql
 数据库简介：
1. 数据库能干什么？
   1. 能够持久存储数据，我们前端存储数据是在变量中的，而变量是存在内存中的，而内存存储以及丢失很快，一刷新页面之前用户所做的操作比方说某的属性的变化都会丢失；前端存储数据还会有请求ajax让后端来保存数据，而后端保存数据就是在数据库中
   2. 备份和恢复数据
   3. 快速的存储数据
   4. 权限控制，操作数据库的人员需要使用一个账号才能对数据库拥有有限的操作权限
2. 数据库有哪些类型？
   1. 关系型数据库
		- 特点：以表和表的关联构成的数据结构
		- 优点：表达复杂的数据关系，强大的查询语言sql，能精确查找想要的数据
		- 缺点：读写性能较差、尤其是海量数据读写；数据结构比较死板
		- 用途：存储结构复杂的数据(特别是业务数据)
		- 代表：Oracle、MySql、Sql Server
   2. 非关系型数据库
		- 特点：极其简单的结构存储数据 如文档型、键值对型数据库
		- 优点：格式灵活、海量数据读取效率很高
		- 缺点：难以表达复杂的数据结构、对于复杂查询效率不高不好
		- 用途：存储结构简单的数据
		- 代表：MangoDB、Redis、Membase
   3. 面向对象数据库---前端用不到、java等强类型的语言用的

### MySql安装使用

   > mysql -uroot -p :进入mysql命令交互
   > show variables like 'character\_set\_%';    查看命令
	 > net stop mysql80    在windows系统下关闭mysql服务
	 > net start mysql80   在windows系统下开启mysql服务
	 > show databases   查看当前拥有的数据库
 
### 数据库设计(DDL)
1. SQL
   1. 结构化查询语言(声明式语言 如html、css)，大部分关系型数据都有着基本一致的SQL语法
   2. 分支：
      - DDL：数据定义语言，操作数据库对象，数据库对象中包含库、表、视图、存储过程
      - DML:数据操控语言，用来操作数据库中的记录
      - DCL：数据控制语句，操作用户权限
2. 管理库
   1. 创建数据库 create database 库名
   2. 删除数据库 drop database 库名
   3. 也可以直接使用Navicat图形化界面的方式创建库或者删除库
3. 管理表
   1. 创建表 
    > 通过Navicat图形化界面创建或者DDL命令行创建表
    create table 数据库名 表名
    - 字段：就是列，包含字段名(列名)、字段类型、是否为null、自增、默认值
      - 字段类型
        1. bit：0或1，false或true
        2. int：占32位，整数
        3. decimal(M,N):能精确计算数字，M是总数字数量，N是小数数量(例如：3.1415926 M是8，N是7)
        4. char(n):固定长度n位字符
        5. varchar(n):长度可变，最大数量为n的字符
        6. text:大量字符(例如存文章大量字符)
        7. date:仅日期
        8. datetime:日期和时间
        9. time:仅时间
   2. 删除表
   > 通过Navicat图形化界面创建或者DDL命令行删除表
   drop table 表名 数据库名
4. 主键和外键
   1. 主键
      1. 根据设计原则，每张表都要有主键(通常叫id，类型可为数字、字符串、uuid)
      2. 主键需要满足要求：主键用来保证某一列必须唯一、不能更改、无业务含义(学号、身份证号、手机号都不可以做主键，因为会变化。)
   2. 外键
      1. 用于产生表关系的列
      2. 外键列会连接到另一张表的主键或自己的主键
5. 表关系
   1. 一对一：一个A对应一个B，一个B对应一个A，例如用户和用户信息，把任意一张表的主键同时设置为一张外键
   2. 一对多：一个A对应多个B，一个B对应一个A,A和B是一对多，B和A是多对一。例如：班级和学生，用户和文章。在多一端的表上设置外键，对应到另一张表的主键。
   3. 多对多：一个A对应多个B，一个B对应多个A。例如学生和老师。需要新建一张关系表，关系表至少包含两个外键，分别对应两张表
6. 数据库三大设计范式
   1. 要求数据库表的每一列都是不可分割的原子数据项
   2. 非主键列必须依赖于主键列
   3. 非主键列必须直接依赖于主键列


### 表记录的增删改(DML)
1. 增(Create)
   ```sql
      -- 数据库  增
   <!-- student是学生表 -->
   INSERT INTO `student`(id,name,birthday,sex,calssid)
   VALUES('1','左','2021-8-21',true,'1')
   ```
2. 删(Delete)
   **删除操作只能删表里的行(记录)，不能删表里的列(字段)**
   ```sql
      -- 数据库 删
      -- 删除id为4的记录
      DELETE FROM student

      where id=4  

   ```
3. 改(Update)
   ```sql
      -- 数据库  改

      UPDATE `student` SET name='左亮亮'
      WHERE id=1
   ```
4. 查(Retrieve)
   **单表基本查询**
   1. select
   ```sql
      select 字段 from `数据源(表)`  //查询表中的某个字段
      1. as
      select 字段 as 别名 from  `数据源(表)` //给查到的某个字段起个别名
      select 字段 别名 from  `数据源(表)`//给查到的某个字段起个别名
      
      2. *
      select * from `数据源(表)` //查询表中所有字段(列)
      
      3. case
      //写法1
      select case ismale  
      when 1 then '男'  //sql中的when相当于js中的if或者else if
      else '女'
      end as sex from `员工表`  //表示查询员工表中ismale字段如果是1则改成男0改成女，并且把ismale字段改成sex
      //写法2
      select case   
      when ismale= 1 then '男' 
      else '女'
      end as sex  from `员工表`   //表示查询员工表中ismale字段如果是1则改成男0改成女，并且把ismale字段改成sex

      4. distinct(去重)
      select distinct location from `员工表` //在员工表中去重地址相同的

      select distinct `location`,ismale from `员工表` //在员工表中去重地址和名字都相同的员工

   ```
   2. from 
   from后面跟表名
   ```sql
   select 字段 from `数据源(表)`  //查询表中的某个字段

   ```
   3. where
   对查询表结果进一步筛选
   ```sql
      1. =
      select * from `员工表(表)` where ismale=1//查询表中ismale字段中等于1的员工
      查询顺序为：从员工表中一行一行匹配ismale=1，如果这一行ismale不等于1则抛弃这一行，如果这一行ismale=1则运行select * from `员工表(表)`将这一行显示到结果表中
      
      2. in
      //部门表中的companyId是外键，连接到公司表的主键id，公司表id只有1、2、3
      select * from `部门表` where in companyId(1,2,3)//查询companyId在1或2或3中的部门，in代表在某个区间之中

      3. is
      select * from `员工表` where email is null//查询员工表中email为null的员工
      4. is not
      select * from `员工表` where email is not null//查询员工表中email不是null的员工

      5. > < >= <=
      select * from `员工表` where salary >=10000 //查询员工表中工资大于等于10000元的员工

      6. between  and
      select * from `员工表` where salary between 10000 and 12000 //查询员工表中薪资在10000k到12000k之间的员工

      7. like(模糊查询)
      select * from `员工表` where `name` like '%袁%' //查询员工表中name字段中包含袁字的所有字段信息 

      select * from `员工表` where `name` like '袁%' //查询员工表中name字段中袁字为首位的所有字段信息 

      select * from `员工表` where `name` like '袁_' //查询员工表中名字为两个字符的员工所有记录信息，_下划线代表一个字符长度

      8. and  (多个条件并列) 查询时and优先级大于or
      select * from `员工表` where `name` like '张%' and ismale is 0 and salary >=10000 //查询员工表中名字姓张的并且是女生并且薪资在10000元以上的

      9. or(或者)
      select * from `员工表` where `name` like '张%' and ismale is 0 and salary >=10000 or birthday >='1996-1-1' //查询员工表中名字姓张的并且是女生并且薪资在10000元以上的或者生日大于等于1996年1月1号的，满足这两个条件其一就显示
    ```

   4. order by
   order by 默认是升序排序
   ```sql
      1. asc 升序
      select * from `员工表` where `name` like '张%' and ismale is 0 and salary >=10000 
      order by salary asc
       //查询员工表中名字姓张的并且是女生并且薪资在10000元以上的员工并升序排序，排序是在查出来之后再排序

      2. desc 降序
      select * from `员工表` where `name` like '张%' and ismale is 0 and salary >=10000 
      order by salary desc
      //查询员工表中名字姓张的并且是女生并且薪资在10000元以上的员工并降序排序，排序是在查出来之后再排序

      3. 多个升序降序一起用
      select * from `员工表` where `name` like '张%' and ismale is 0 and salary >=10000 
      order by salary desc, sex asc//将结果表按照薪资降序，性别升序显示
   ```
   5. limit(n,m) (跳过n条数据取出m条数据)
   ```sql
      select * from `员工表` limit 2,3//在所有员工中跳过前两条记录，从第二条记录之后取出3条记录

   ```

 > 查询顺序：from > where > select > order by > limit

   **联表查询**
   1. 笛卡尔积
      两张表的数量相乘
      ```sql
         select * from `员工表` `公司表`
      ```
   2. 左连接 left join
   3. 右连接 right join
   4. 内连接 inner join，最终将多张表连接在一张表显示
      ```sql
         select 员工表.name as aname , 部门表.name as bname,公司表.name as cname  from `员工表` 
         inner join  `部门表` on 员工表.id=部门表.id 
         inner join  `公司表` on 部门表.id=公司表.id

         //筛选员工表.id=部门表.id ，并且部门表.id=公司表.id的name字段，on为筛选条件
      ```
      必须是满足条件的才可筛选出来

### 函数和分组
1. 函数
    **内置函数**
    1. 数学函数
         1. ABS(x) 返回x的绝对值
         2. CEILING(x)  向上取整，返回大于x的最小整数，别名CEIL(x)
         3. FLOOR(x) 向下取整，返回小于x的最小整数
         4. MOD(x,y) 取模，返回x/y的模(余数)
         5. PI()  返回PI的值，(圆周率)
         6. RAND() 返回0-1之间的随机数
         7. ROUND(x,y) 对x四舍五入，保留y个小数
               ``` select ROUND(3.146,2) //返回3.15 ```
         8. TRUNCATE(x,y) 对x截断y位小数的结果
        			 ``` 
      					     select TRUNCATE(3.146,2) //返回3.14
      				 ```
   	2. 聚合函数 **最终显示一个字段名，一个值**
   		1. AVG(col) 返回指定列的平均值。故在select查询时只能查一列，即select AVG(列) from `表`  不可以
   			select AVG(列),字段 from `表`这样写,但是可以和聚合函数写多个
   			```sql
   				select AVG(salary) from `员工表` //得到员工表中salary这一列所有人的平均值
   			```
   		2. COUNT(col) 查询指定列中非null值的个数
   			```sql
   				select COUNT(id) from `员工表` //查询员工id数量，由于每个员工都有唯一id，所以可叫做查询所有员工数量
   			```
			3. SUM(col) 返回指定列中所有值之和
			4. MIN(col)  返回指定列中最小值
			5. MAX(col) 返回指定列中最大值
				```sql
					select COUNT(id) as 员工总数
				  AVG(salary) as 平均薪资,
					SUM(salary) as 所有员工薪资之和,
					MAX(salary) as 所有员工最高薪资,
					MIN(salary) as 所有员工最低薪资
					from `员工表`
				```
	3. 字符函数
		1. CONCAT(字段1,字段2...) 将字段1,字段2等连接成一个字符串
		2. CONCAT_WT(sep,字段1,字段2...)  将字段1,字段2等连接成一个字符串,并使用sep进行分割
		3. TRIM(str)  去掉字符串首部和尾部的所有空格
		4. LTRIM(str) 从字符串str中切掉开头的空格
		5. RTRIM(str) 从字符串str中切掉结尾的空格




	4. 日期
		1. CURRENT_DATE() 或CURDATE() 返回当前日期 2021-08-23
		2. CURRENT_TIME() 或CURTIME() 返回当前时间时分秒 13:54:11 
		3. TIMESTAMPDIFF(unit,datetime1,datetime2)  返回datetime1到datetime2之间相隔的unit值，unit是用于指定相隔的年或月或日等
			unit可以写：
			1. microsecond 毫秒
			2. second 秒
			3. minute 分
			4. hour 时
			5. day 天
			6. week 周
			7. month 月
			8. quarter 季度
			9. year 年




    自定义函数
      由于我们不是后端用不到写自定义函数
2. 分组
   
	 分组后只能查询分组的列和聚合列


### 视图
操作视图属于DDL

视图是缓存的表格，每次查缓存的表格

 ```sql
   create view `数据库` `视图名` as 
   员工表.name as aname , 部门表.name as bname,公司表.name as cname  from `员工表` 
   inner join  `部门表` on 员工表.id=部门表.id 
   inner join  `公司表` on 部门表.id=公司表.id

 ```


## 数据驱动和ORM框架

### Mysql驱动程序
1. 什么是驱动程序？
   - 驱动程序是连接内存和其他存储介质的桥梁
   - mysql驱动程序是连接内存数据和mysql数据的桥梁
   - mysql驱动程序常用mysql(官方)和mysql2(第三方)
2. mysql2的使用
   ```sql
		写法1：回调方式

			// 导入mysql2包
			const mysql = require('mysql2');

			// 创建一个数据库连接
			const connection = mysql.createConnection({
				host: 'localhost',
				user: 'root',
				database: 'test'
			});

			运行sql查询语句
			connection.query(
				'SELECT * FROM `student`',
				function(err, results, fields) {
					console.log(results); // 查询结果
					// console.log(fields); // fields contains extra meta data about results, if available
				}
			);
			<!-- 向数据库增加语句
			connection.query(
					'insert into `student` (id,name,birthday,sex) values("2","MR.right左","2021-08-24",true);',
					function(err, results, fields) {
							console.log(err)
						console.log(results); // 查询结果
						// console.log(fields); // fields contains extra meta data about results, if available
					}
				); -->
			<!-- 修改数据库中的记录
			connection.query(
					'update `student` set name="Mr.right左2" where id=4',
					function(err, results, fields) {
							console.log(err)
						console.log(results); // 查询结果
						// console.log(fields); // fields contains extra meta data about results, if available
					}
				); -->

			<!-- 删除数据库中的记录
			connection.query(
					'delete from `student` where id=4',
					function(err, results, fields) {
							console.log(err)
						console.log(results); // 查询结果
						// console.log(fields); // fields contains extra meta data about results, if available
					}
				); -->


		写法2：使用promise的方式
		async function main() {
			// 导入mysql2/Promise包
			const mysql = require('mysql2/promise');
			//创建一个数据库连接
			const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
			// 写sql语句
			const [rows, fields] = await connection.query('SELECT * FROM `student`);
		}






		注意：由于会有sql注入的问题，以上两种写法不行hhhhh，需要使用下面第三条的写法
	 ```

3. 防止sql注入

	> 用户通过connection.query(sql语句) 注入sql语句到最终查询中，导致sql与预期不符，比如我想查询某个记录，结果由于用户sql注入导致数据库最终增加或者删除或者修改了某个记录，最终数据库的展示与预期不符了。

	为了防止sql注入，sql支持变量的写法，我们在connection.query(sql语句+'变量')这样就不会有字符串拼接的问题了，sql会把变量当成一个整体而不是一个sql语句

	```sql

			写法一：回调方式

			// 导入mysql2包
			const mysql = require('mysql2');

			// 创建一个数据库连接
			const connection = mysql.createConnection({
				host: 'localhost',
				user: 'root',
				database: 'test'
			});

			// 书写sql语句
			connection.execute(
				'SELECT * FROM `student` WHERE `name` = ? AND `age` > ?',
				['Page', 45],
				function(err, results) {
					console.log(results);
				}
			);



			写法二：promise方式
			async function main() {
				// 导入mysql2/Promise包
				const mysql = require('mysql2/promise');
				//创建一个数据库连接
				const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
				// 写sql语句
				const [rows, fields] = await connection.execute('SELECT * FROM `student`,['Morty', 14]);
			}

	```

	> 由于sql注入的问题，使用connection.execute()方法来解决，其中语句中的变量用?来表示，第二个人参数是个数组，数组中每一个值对应sql语句中每一个变量

4. 连接池

   - 由于可能50个用户同时请求服务器，那么服务器就会开50个连接与数据库，如果我们没有及时清理服务器与数据库的连接会随着用户的请求连接越来越多，最终导致服务器异常卡顿。  使用连接池能有效解决这种问题，连接池可以规定一定数量连接，如果再有用户请求就等着。
	 使用连接池会自动搞定连接回收重用等，特别方便。

		```sql

			// 引入mysql2包
			const mysql = require('mysql2');

			// 创建一个连接池
			const pool = mysql.createPool({
				host: 'localhost',
				user: 'root',
				database: 'test',
				waitForConnections: true,//连接池连接数量用满时是否需要等待
				connectionLimit: 10,//连接池最大连接数量
				queueLimit: 0,//排队队列长度，0代表不限制长度，多少都行
			});


			async function main() {
					// 写sql语句
					const [rows, fields] = await pool.execute('SELECT * FROM `student`,['Morty', 14]');
					
			}

		```


### Sequelize简介

1. ORM(对象关系映射到数据库)
  - ORM可以自动将程序中的对象与数据库关联
  - ORM框架会隐藏具体的数据库底层细节，让开发者使用同样的数据操作接口，完成对不同数据库的操作；  ORM提供的API无须使用sql语句，它会根据具体的调用方式，自动生成最合适的sql语句操作数据。
	![avatar](http://m.qpic.cn/psc?/V51Mju1I4Uz5tx4Tu1Fj4XfvFp1oGJ7w/45NBuzDIW489QBoVep5mcQWuglMWIS7JLDMKjdwHXI2nUemQNg1ZHG2zO6usbHm7PEuQ018vWPRX40k9FO9PVUmzqFhSpb.VFv2A2GrkcDM!/b&bo=oAU4BAAAAAABF6k!&rf=viewer_4)

	- ORM优势：
    1. 开发者不用关心数据库，仅需关心对象
    2. 可轻易完成数据库移植
    3. 无须拼接sql语句即可完成精准查询
2. Node中的ORM框架
   主要包含两个 ：Sequelize和TypeORM
   Sequelize支持js和ts 比较成熟
	 TypeORM只支持ts  不成熟

### 模型定义和同步


	
   