const wsUrl = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.j-chat-input');
const btnSend = document.querySelector('.j-btn-send');
const btnLocation = document.getElementById("btnLocation");
const chatWindow = document.getElementById("chatWindow");

let websocket;

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

function writeToChat(message, isUser) {
    let messageContainer = document.createElement('div');
    messageContainer.textContent = message;
    messageContainer.classList.add(isUser ? 'user-input' : 'server-output');
    messageContainer.style.display = 'block';
    chatWindow.appendChild(messageContainer);

    scrollToBottom(chatWindow);
}

btnSend.addEventListener('click', () => {
    const message = input.value;
    if (message !== '') {
        websocket = new WebSocket(wsUrl);

        websocket.onopen = function () {
            writeToChat(message, true);
            websocket.send(message);
            input.value = '';
        };

        websocket.onmessage = function (evt) {
            writeToChat(evt.data);
        };

        websocket.onerror = function (error) {
            writeToChat(error);
            console.error('Ошибка WebSocket:', error);
        };

        websocket.onclose = function () {
            console.log('Соединение WebSocket закрыто');
        };
    }
});

// геолокация

const error = () => {
    let errorMessage = document.createElement('div');
    errorMessage.textContent = 'невозможно получить ваше местоположение 💀';
    errorMessage.style.display = 'block';
    errorMessage.classList.add('server-output');
    chatWindow.appendChild(errorMessage);

    scrollToBottom(chatWindow);
  }

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    let locationMessage = document.createElement('div');
    locationMessage.innerHTML = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">нажмите на это сообщение, чтобы открыть геолокацию на карте 🗺️</a>`;
    locationMessage.style.display = 'block';
    locationMessage.classList.add('user-input');
    chatWindow.appendChild(locationMessage);

    scrollToBottom(chatWindow);
}

btnLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        let errorMessage = document.createElement('div');
        errorMessage.textContent = 'геолокация не поддерживается вашим браузером';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('server-output');
        chatWindow.appendChild(errorMessage);

        scrollToBottom(chatWindow);
    } else {
        let infoMessage = document.createElement('div');
        infoMessage.textContent = 'определение местоположения…';
        infoMessage.style.display = 'block';
        infoMessage.classList.add('user-input');
        chatWindow.appendChild(infoMessage);
        navigator.geolocation.getCurrentPosition(success, error);

        scrollToBottom(chatWindow);
    }
});
