const express = require('express');
const app = express()
const port = 3080

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname+'/public'))

var waitingQue=[]
var rooms=[]
var roomId=''

io.on('connection',socket=>{
    console.log('a user connected')

    socket.on('login',(res)=>{
     
        if(waitingQue.length>0){

            popedUser=waitingQue.pop()

            roomId=socket.id+'+'+popedUser.socket.id   

            popedUser.socket.join(roomId)
            socket.join(roomId)
           
            rooms[socket.id]=roomId
            rooms[popedUser.socket.id]=roomId

            socket.emit('Start Chat',{status:'connected'})
            popedUser.socket.emit('Start Chat',{status:'connected'})

        } else {
            user={userName:res.userName,socket:socket}
            waitingQue.push(user)
        }

    

    })
   
    socket.on('disconnect',()=>{
        waitingQue=[]
        console.log('User Disconnected')
    })

})




server.listen(port, () => console.log(`Chat app listening at http://localhost:${port}`))