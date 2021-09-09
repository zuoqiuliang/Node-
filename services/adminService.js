const { restore } = require('../models/admin')
const Admin=require('../models/admin')
const md5=require('md5');
//由于sequelize框架是操作数据库，所以这些函数都是异步的
exports.addAdmin= async function(adminObj){
  adminObj.loginPwd=md5(adminObj.loginPwd);
  const ins=await Admin.create(adminObj)
  return ins.toJSON()
}

exports.deleteAdmin=async function(adminId){
  const ins= await Admin.findByPk(adminId);
  ins.destroy()
}

exports.updateAdmin=async function(adminId,updateObj){
    // const ins= await Admin.findByPk(adminId);
    // ins.loginId='liang';
    // ins.save();
  const res= await Admin.update(updateObj,{
      where:{
        id:adminId
      }
    })
    console.log(res)
}


// 查询登录信息
exports.login=async function(loginId,loginPwd){
  loginPwd=md5(loginPwd)
  const  res= await Admin.findOne({
    where:{
      loginId,
      loginPwd
    }
  })
  if(res.loginId===loginId&&res.loginPwd===loginPwd){//稍微验证账号密码大小写
    return res.toJSON()
  }
  return null
}

exports.getAdminById=async function(Id){
  const res=  await Admin.findByPk(Id)
  return res.toJSON()
}