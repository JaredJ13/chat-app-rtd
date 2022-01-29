const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
    }
})

const users = []

io.on('connection', socket => {
    // ASSIGN NEW SOCKET CREATED TO NEW USERNAME
    socket.on('new-user', userName => {
        users[socket.id] = userName
        socket.broadcast.emit('user-connection', userName)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnection', users[socket.id])
        delete users[socket.id]
    })

    socket.on('send-chat-message', messageSent => {
        socket.broadcast.emit('incoming-message', {
            messageSent: messageSent,
            userName: users[socket.id]
        })
    })
})