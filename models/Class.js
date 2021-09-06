const sequelize=require('./db');
const { DataTypes } = require('sequelize');
const Student=require('./Student');
const Class=sequelize.define('Class',{
	name:{
		type:DataTypes.STRING,
		allowNull:false
	},
	openDate:{
		type:DataTypes.STRING,
		allowNull:false
	}
},{
	createdAt:false,
	updatedAt:false,
	paranoid:true
})
Class.hasMany(Student)//外键 Class拥有多个Student
module.exports=Class