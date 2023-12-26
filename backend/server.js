require('dotenv').config()
const express = require("express");
const app=express();
const cors=require("cors");
const authRouter = require('./routes/authRoutes')
const ChatRoute = require('./routes/ChatRoute')
const MessageRoute = require('./routes/MessageRoute')
const userRouter = require('./routes/userRoute')
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json())
app.use((req,res,next) => {
    console.log( req.method, req.path )
    next()
})
app.use('/auth',authRouter)
app.use('/user', userRouter)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT,() => console.log('Listening on port ' + process.env.PORT))
    })
    .catch(e => console.log(e.message))