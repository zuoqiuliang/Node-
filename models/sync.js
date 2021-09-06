//启动自动同步所有模型
require('./admin');
require('./Class');
require('./Student');
require('./Book');
const sequelize=require('./db');
sequelize.sync({alter:true}).then((res)=>{
    console.log('全部模型同步完成了')
})

