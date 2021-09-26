exports.sendError=(err,errCode=500)=>{
    return {
        code:errCode,
        msg:err||null
    }
}

exports.getResult=(result)=>{
    return {
        code:200,
        data:result
    }
}