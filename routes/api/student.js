const express=require('express')
const studentRouter=express.Router()
const stuServer=require('../../services/studentService')
const {sendError,getResult}=require('../getSendResult')
// /api/student
studentRouter.get('/',async (req,res)=>{
    console.log('获取所有学生')
    const page=req.query.page||1;
    const sex=req.query.sex||-1;
    const limit=req.query.limit||10;
    const name=req.query.name||'';

    const result= await stuServer.getAllStudents(page,limit,sex,name)
    res.send(getResult(result))
})

// /api/student/xxx
studentRouter.get('/:id',async (req,res)=>{
    console.log('获取单个学生')
   const result= await stuServer.getStudentById(req.params.id);
   res.send(getResult([result]))
})


studentRouter.post('/',async (req,res)=>{
    console.log('添加单个学生')
    console.log(req.body)
    const result= await stuServer.addStudent(req.body);
    res.send(getResult(result))
})


studentRouter.delete('/:id',async (req,res)=>{
    console.log('删除单个学生')
    const result= await stuServer.deleteStudent(req.params.id);
    res.send(getResult(result))
})

studentRouter.put('/:id',async (req,res)=>{
    console.log('修改单个学生')
    const result=await stuServer.updateStudent(req.params.id,req.body);
    res.send(getResult(result))
})
module.exports= studentRouter
