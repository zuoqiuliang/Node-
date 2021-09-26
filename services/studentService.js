const Student = require('../models/Student');
const Class=require('../models/Class')
const validate=require('validate.js')
const moment =require('moment')

module.exports = {
    async addStudent(mainObj) {
        const rule={//验证规则
            name:{//验证name属性
               presence:{
                  allowEmpty:false//代表是否存在,是否为空，false表示不可为空
               },
               type:'string',//代表name这个属性必须为字符串
            },
            birthday:{//验证birthday属性
               presence:{
                  allowEmpty:false//代表是否存在,是否为空，false表示不可为空
               },
               datetime:{
                  dateOnly:true,//只写日期就通过验证
                  earliest:+moment.utc().subtract(100,'y'),//代表从当前时间回退100年的时间戳作为最早时间
                  latest:+moment.utc().subtract(5,'y'),//从当前时间回退5年的时间戳作为最晚时间
   
               }
            },
            sex:{
                presence:true,
                type:'boolean',

            },
            mobile:{
                presence:true,
                format:/1\d{10}/
            },
            classId:{
                presence:true,
                numericality:{//只要是数字就可以，哪怕写在字符串中的数字也可以
                    strict:false,
                    onlyInteger:true//只能是整数
                }
            }
         }
   
         const res=validate.validate(mainObj,rule)
         console.log(res)
       const ins= await Student.create(mainObj)
        console.log('增加了一条学生数据')
        return ins.toJSON()
    },
    async deleteStudent(mainId) {
        await Student.destroy({
            where: {
                id: mainId
            }
        })
        console.log('删除学生数据完成了')
    },
    async updateStudent(mainId, updateObj) {
        await Student.update(updateObj, {
            where: {
                id: mainId
            }
        })
        console.log('修改一条学生数据完成')
    },
    async getManStudents(){
      const res= await Student.findAll({
            where:{
                sex:1
            }
        })
        return JSON.stringify( res )
    },
    async getAllStudents(page=1,limit=10,sex){//分页查询
    //   const res=  await Student.findAll({
    //         offset:(page-1)*limit,//跳过行数
    //         limit:+limit//获取几行
    //     })
    //     const total=await Student.count()//学生总数
    //     const datas=JSON.parse( JSON.stringify(res) )//分页查询学生列表
    //     return {
    //         total,
    //         datas
    //     }
        const res=  await Student.findAndCountAll({
            attributes:['id','name','birthday','sex'],//只查询想要的字段
            where:{
                sex
            },
            include:[Class],
            offset:(page-1)*limit,//跳过行数
            limit:+limit//获取几行
        })
        console.log(res)
        return {
            total:res.count,
            datas:JSON.parse(JSON.stringify(res.rows))
        }
        
    },
    async getStudentById(id){
      const res= await  Student.findByPk(id)
      return res
    }

}