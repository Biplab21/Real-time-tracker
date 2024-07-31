const express = require('express')
const app = express()
const http = require("http")
const path = require('path')

const socket = require('socket.io')
const server = http.createServer(app) 
const io = socket(server) 

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket)=>{
    socket.on("send-location", function(data){ //get the location from frontend
        io.emit("receive-location", {id: socket.id, ...data}) //send the location to frontend
    })

    
    socket.on("disconnect", (id)=> {
        io.emit("user-disconnect", socket.id)
    })
    console.log("connected");
})

app.get("/", (req, res)=>{
    res.render("index")
})

server.listen(3000)