const Student = require('../models/Student');

module.exports = {
    async addStudent(mainId) {
        await Student.create({
            name: '左亮亮',
            birthday: '1999-9-19',
            sex: true,
            mobile: '13715894568'
        })
        console.log('增加了一条学生数据')
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
    }

}