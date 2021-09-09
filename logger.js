const log4js=require('log4js')
const path=require('path')
log4js.configure({
    appenders:{//出口
        sql:{//定义一个sql日志出口
            type:'file',//如果type值为datefile则会在自动备份时后缀名加当前日期
            filename:path.resolve(__dirname,'logs','sql','logging.log'),
            layout:{
                type:'pattern',
                pattern:'%d{yyyy-MM-dd hh.mm.ss} %c %p %m%n'
            },
            maxLogSize:1024,//配置文件最大字节数1024个字节，防止日志越写越多无限多，1024个字节=1kb，1024kb=1Mb
            keepFileExt:true,//保留log文件后缀名，如果有type:datefile配置时将显示   文件名.日期.log 这种格式
            daysToKeep:1,//只保留之前一个日志，设置几就保留之前几个日志文件
        },
        default:{//定义一个default日志出口
            type:'stdout',//命令行输出
            filename:path.resolve(__dirname,'logs','default','logging.log'),
            layout:{
                type:'pattern',
                pattern:'%d{yyyy-MM-dd hh.mm.ss} %c %p %m%n'
            },
            maxLogSize:1024,//配置文件最大字节数1024个字节，防止日志越写越多无限多，1024个字节=1kb，1024kb=1Mb
            keepFileExt:true,//保留log文件后缀名，如果有type:datefile配置时将显示   文件名.日期.log 这种格式
            daysToKeep:1,//只保留之前一个日志，设置几就保留之前几个日志文件
        }
    },
    categories:{//分类
        sql:{//分类名为sql
            appenders:['sql'],//该分类使用出口sql的配置写入日志
            level:'all'
        },
        default:{//分类名为default
            appenders:['default'],//该分类使用出口default的配置写入日志
            level:'all'
        }
    }
})



// logger.level='all'//打印的级别是all，代表大于等于all的级别的信息会被打印

process.on('exit',()=>{
    log4js.shutdown()
})



const sqllogger=log4js.getLogger('sql')//得到日志记录对象
const defaultlogger=log4js.getLogger()
module.exports={
    sqllogger,
    defaultlogger
}
sqllogger.info('配置的在文件输出 --sql')//打印的类型是info,默认打印在命令行

defaultlogger.info('默认在命令行输出--default')