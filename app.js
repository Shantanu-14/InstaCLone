const express = require('express')
const app=express()
const mongoose=require('mongoose')
const PORT = process.env.PORT || 5000
const{MONGOURI}=require('./config/keys')




mongoose.connect(MONGOURI,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => console.log("DB Connection is successful"))
.catch((err) => console.log(err));



app.use(express.json())
require('./models/user') 
require('./models/post')
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on ",PORT)
})