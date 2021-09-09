const validate=require('validate.js')
const moment =require('moment')

// 这是一个扩展，扩展validate库中validators配置里面的datetime
validate.extend(validate.validators.datetime,{
    /**
     * 该函数自动用于日期格式转换
     * 它会在验证时自动触发，它需要将任何数据转换为时间戳返回
     * 如果无法转换返回NaN
     * @param {*} value  传入要验证的值
     * @param {*} options 验证配置
     */
    
    parse(value,options){
        let format=['YYYY-M-D H:m:s','YYYY-MM-DD HH:mm:ss','x'];
        if(options.dateOnly){
            format=['YYYY-M-D','YYYY-MM-DD','x'];
        }
        return +moment.utc(value,format,true)
    },
    /**
     * 用户显示错误消息时，使用的显示字符串
     * @param {*} value 
     * @param {*} options 
     */
    format(value,options){
        let format='YYYY-MM-DD';
        if(!options.dateOnly){
            format='YYYY-MM-DD HH:mm:ss'
        }
        return moment.utc(value).local().format(format)
    }
})