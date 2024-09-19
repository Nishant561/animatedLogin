const express = require('express');
const app = express();
const cors = require('cors')
const globalErrorHandler = require('./controller/globalErrorHandler')
const userRouter  = require('./route/userRoute')
app.use(express.json())
app.use(cors())


//initializing the user route

app.use('/api/users',userRouter)




app.use(globalErrorHandler)


module.exports = app