
const sequelize=require('./db');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define('Admin', {
    // 在这里定义模型属性(相当于配置标的列/字段)
    loginId: {
      type: DataTypes.STRING,//loginId这一列要求为字符串类型
      allowNull: false,//不允许为null
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
      }
  },{
    //   freezeTableName:true,//代表模型名和表名相同，如果没有这个属性则表名比模型名多一个s
    //   tableName:'administrator'//直接写表名
    createdAt:'createtime',
    updatedAt:'更新时间',
    paranoid:true,//设置该属性后该表的数据不会真正删除，而是增加一列deletedAt,记录删除的时间，通过判断deletedAt是否有时间来判断该数据是否删除了。
    

  });
Admin.sync({
    alter:true
})
module.exports=Admin