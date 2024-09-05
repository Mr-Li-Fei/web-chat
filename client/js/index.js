;(function enterChat() {
    const username = document.getElementById('username');
    const enterBtn = document.getElementById('enterBtn');
    const init = () => {
        bindEnterFunc();
    };

    const verifyUser = () => {
        console.log(username, username.value.trim().length);
        if (username.value.trim().length > 6) {
            return true;
        }
        alert('username的长度不少6')
        return false;
    }

    const bindEnterFunc = () => {
        enterBtn.addEventListener('click', goChatRoom);
    }

    const goChatRoom = () => {
        const isVerified = verifyUser();
        if (!isVerified) return;
        sessionStorage.setItem('user', username.value);
        location.href = './client/chat.html';
    }

    init();
})();