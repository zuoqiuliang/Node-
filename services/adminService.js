const Admin=require('../models/admin')

//由于sequelize框架是操作数据库，所以这些函数都是异步的
exports.addAdmin= async function(adminObj){
  const ins=await Admin.create(adminObj)
  return ins.toJSON()
}

exports.deleteAdmin=async function(adminId){
  const ins= await Admin.findByPk(adminId);
  ins.destroy()
}

exports.updateAdmin=async function(adminId){
    const ins= await Admin.findByPk(adminId);
    ins.loginId='liang';
    ins.save();

}