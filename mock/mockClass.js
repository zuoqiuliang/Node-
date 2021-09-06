const mock=require('mockjs')

const arr=mock.mock({
    'data|16':[{
        'id|+1':1,
        'name':'网络S17-@id 班',
        'openDate':'@datetime()'
    }]
}).data


const Class=require('../models/Class')
Class.bulkCreate(arr)//向库中添加多个