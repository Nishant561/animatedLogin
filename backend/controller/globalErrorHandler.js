module.exports = (error, request , response ,next)=>{

    return response.status(400).json({
        status:'fail',
        message:error.message,
        stack:error.stack
    })

}