const Class = require('../models/Class');
module.exports = {
	async addClass(id) {
		const ins = await Class.create({
			name: '网'+id,
			openDate: '2017-09-01'
		})
		console.log('增加记录完成')
	},
	async deleteClass(mainId) {
		const ins = await Class.destroy({
			where: {
				id: mainId
			}
		})
		console.log('删除记录完成')
	},
	async updateClass(mainId, updateObj) {
		const ins = await Class.update(updateObj, {
			where: {
				id: mainId
			}
		})
	console.log('修改记录完成了')

	}
}