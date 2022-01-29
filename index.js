const socket = io('http://localhost:3000')
messageDisplay = document.querySelector('#message-box')
messageInput = document.querySelector('#message-input')
submitButton = document.querySelector('#submit-button')
usernameInput = document.querySelector('#username-input')
usernameSubmit = document.querySelector('#username-submit-button')

let newUserName = ''

//send message to our server
submitButton.addEventListener('click', function (e) {
    e.preventDefault()

    const message = messageInput.value

    displayOutgoingMsg(message)

    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

//send username to our server and create new socket for username on server.js
usernameSubmit.addEventListener('click', function (e) {
    e.preventDefault()


    newUserName = usernameInput.value

    if (newUserName === '') {
        alert('Please enter a valid username.')
    } else {
        const elem = document.querySelector('.user-name-area')
        elem.parentNode.removeChild(elem)
        displayUserConnection(newUserName)
        document.querySelector('.send-box').classList.add('send-box-edit')
        document.querySelector('.send-box').classList.remove('send-box')
        socket.emit('new-user', newUserName)
    }
})

//SOCKET DISPLAY CALLS
socket.on('incoming-message', message => {
    displayIncomingMsg(message)
})

socket.on('user-connection', user => {
    displayUserConnection(user)
})

socket.on('user-disconnection', user => {
    displayUserDisconnection(user)
})

// DISPLAY FUNCTIONS
function displayOutgoingMsg(message) {
    let content = `
    <p class="outgoing-msg">You: ${message}</p>
    `

    messageDisplay.insertAdjacentHTML('beforeEnd', content)
}

function displayIncomingMsg(message) {
    let content = `
    <p class="incoming-msg">${message.userName}: ${message.messageSent}</p>
    `

    messageDisplay.insertAdjacentHTML('beforeEnd', content)
}

function displayUserConnection(user) {
    let content = `
    <p class="user-connection">${user} connected to chat</p>
    `

    messageDisplay.insertAdjacentHTML('beforeEnd', content)
}

function displayUserDisconnection(user) {
    let content = `
    <p class="user-disconnection">${user} disconnected from chat</p>
    `

    messageDisplay.insertAdjacentHTML('beforeEnd', content)
}


