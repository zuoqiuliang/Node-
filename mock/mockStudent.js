const mock=require('mockjs')

 const stuArr= mock.mock({
    'data|300-500':[
        {
            name:'@cname',
            birthday:'@date',
            'sex|1-2':true,
            mobile:/1\d{10}/,
            'ClassId|1-16':0,//生成student表外键，由于class表Id是1-16，所以随机1-16中的数
        }
    ]
}).data

console.log(stuArr)
const Student=require('../models/Student')
Student.bulkCreate(stuArr)