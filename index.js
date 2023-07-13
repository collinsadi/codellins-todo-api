const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan") 
const userRoute = require("./routes/userRoutes")
const todoRoute = require("./routes/todoRoutes")


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))


// Routes

app.use(userRoute)
app.use(todoRoute)


const port = 8000
app.listen(port, () => {
    
    console.log("Server Started at Port 5000")
})

// ConnectDatabase
const url = "mongodb://127.0.0.1:27017/todo"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Connected to DataBase Successfully")
})
    .catch((error) => {
    console.log("Could Not Connect DataBase",error)
    })

