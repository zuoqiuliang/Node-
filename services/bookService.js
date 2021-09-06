const Book=require('../models/Book');

module.exports={
   async addBook(mianId){
      await  Book.create({
            name:'左氏3',
            imgUrl:'C:\Users\SX\Pictures\Saved Pictures',
            publishDate:'2021-08-01',
            author:'李好'
        })
        console.log('增加书籍一条记录完成')
    },
   async deleteBook(mainId){
      await  Book.destroy({
            where:{
                id:mainId
            }
        })
        console.log('删除了书籍一条记录')
    },
   async updateBook(updateObj,mainId){
     await   Book.update(updateObj,{
            where:{
                id:mainId
            }
        })
        console.log('修改了一条书籍记录')
    }
}