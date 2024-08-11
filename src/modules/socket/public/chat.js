document.addEventListener('DOMContentLoaded', () => {
    const tokenForm = document.getElementById('tokenForm');
    const tokenInput = document.getElementById('tokenInput');
    const chatDiv = document.getElementById('chat');
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const recipientIdInput = document.getElementById('recipientId');
    const messageInput = document.getElementById('messageInput');
    let socket;

    tokenForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const token = tokenInput.value.trim();
        if (token) {
            connectToWebSocket(token);
            tokenForm.style.display = 'none';
            chatDiv.style.display = 'block';
        }
    });

    function connectToWebSocket(token) {
        socket = io('http://localhost:1234', {
            extraHeaders: {
                Authorization: ` ${token}`
            }
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('getUserMessages');
        });

        socket.on('message', (message) => {
            displayMessage(`New message: ${message}`);
        });

        socket.on('allMessages', (messages) => {
            messagesDiv.innerHTML = '';
            messages.forEach(msg => displayMessage(`Message: ${msg.message}`));
        });

        socket.on('error', (error) => {
            console.error('Error:', error.message);
        });
    }

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const recipientId = recipientIdInput.value.trim();
        const content = messageInput.value.trim();
        if (recipientId && content) {
            socket.emit('sendMessage', { recipientId, content });
            messageInput.value = '';
        }
    });

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
});
