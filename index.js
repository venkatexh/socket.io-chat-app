const express = require("express")
const app = express()
const socket = require("socket.io")

const port = 3000 || process.env.PORT

app.use(express.static('public'))


const server = app.listen(port, function() {
	console.log("Server now running..")
})

const io = socket(server)

io.on('connection', function(socket) {
	console.log("Socket created.")
	socket.on('chat', function(data) {
		io.emit('chat', data)
	})
	
	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data)
	})
})