const sequelize=require('./db');
const { DataTypes } = require('sequelize');

const Student=sequelize.define('Student',{
	name:{
		type:DataTypes.STRING,
		allowNull:false
	},
	birthday:{
		type:DataTypes.STRING,
		allowNull:false,
		get(){//访问器
			return new Date(this.getDataValue('birthday')).getTime() //this指向模型对象,这里将获取到的生日转换为时间戳
		}
	},
    sex:{
        type:DataTypes.BOOLEAN,
		allowNull:false
    },
    mobile:{
        type:DataTypes.STRING(11),
		allowNull:false
    }
},{
	createdAt:false,
	updatedAt:false,
	paranoid:true
})

module.exports=Student