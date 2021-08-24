// 导入mysql2包
const mysql = require('mysql2');

// 创建一个数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// 运行sql语句
// connection.query(
//   'SELECT * FROM `student`',
//   function(err, results, fields) {
//     console.log(results); // 查询结果
//     // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// 向数据库增加语句
// connection.query(
//     'insert into `student` (id,name,birthday,sex) values("2","MR.right左","2021-08-24",true);',
//     function(err, results, fields) {
//         console.log(err)
//       console.log(results); // 查询结果
//       // console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
// 修改数据库中的记录
// connection.query(
//     'update `student` set name="Mr.right左2" where id=4',
//     function(err, results, fields) {
//         console.log(err)
//       console.log(results); // 查询结果
//       // console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );

// 删除数据库中的记录
// connection.query(
//     'delete from `student` where id=4',
//     function(err, results, fields) {
//         console.log(err)
//       console.log(results); // 查询结果
//       // console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );



// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );