const sequelize=require('./db');
const { DataTypes } = require('sequelize');

const Book=sequelize.define('Book',{
	name:{
		type:DataTypes.STRING,
		allowNull:false
	},
	imgurl:{
		type:DataTypes.STRING,//字符串存图片路径
	},
    publishDate:{
        type:DataTypes.STRING,
		allowNull:false
    },
    author:{
        type:DataTypes.STRING,
		allowNull:false
    }
},{
	paranoid:true
})

module.exports=Book