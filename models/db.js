const {
    Sequelize
} = require('sequelize'); //导入sequelize包

//
const sequelize = new Sequelize('myschool', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging:false,//命令行不显示信息
});


module.exports = sequelize //导出sequelize实例