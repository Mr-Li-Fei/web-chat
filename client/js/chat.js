;(() => {
    let ws = null;
    let isConnect = false; // false -连接失败，  true - 连接成功
    let heartBeatTimer = null;
    let noPongCloseTimer = null;
    let lackHeartBeat = false;

    const msg = document.getElementById('socketMsg');
    const sendBtn = document.getElementById('socketBtn');
    const ulEle = document.getElementById('list');
    const user = sessionStorage.getItem('user');
    
    const init = () => {
        ws = new WebSocket('ws://localhost:8080/');
        sendBtn.addEventListener('click', handSendMsg);
        ws.onopen = handOpen;
        ws.onmessage = handMsg;
        ws.onclose = handClose;
        ws.onerror = handError;
    }
    const handSendMsg = () => {
        const value = msg.value;
        // console.log(value, JSON.stringify({msg: value}), 'value');
        // if there are two users， one is admin00, another is the sslvpn45,  they sent message each other.
        if(user === 'admin00') {
            ws.send(JSON.stringify({from:user, to:'sslvpn45', msg: value}));
        } else {
            ws.send(JSON.stringify({from:user, to:'admin00', msg: value}));
        }
 
        // create the li element to show the messages
        createMsgListEle(user, value);
    };
    const handOpen = () => {
        console.log('open test', ws);
        // 判断链接状态给定isConnect 是否为true,  
        ws.send(JSON.stringify({id: 'auth', userId: sessionStorage.getItem('user')}))
        if(ws.readystate === 1) {
            isConnect = true;
        }
        // 设置心跳机制
        beginHeartBeat();
    };
    const handMsg = ({data}) => {
        // console.log('messgae', data);
        const resp = JSON.parse(data);
        if(resp.from) {
            createMsgListEle(resp.from, resp.msg);
        }
        // 每次成功接受信息就重置心跳机制
        resetHeartBeat();
    };
    const handClose = (ev) => {
        console.log('close', ev);
        if(!lackHeartBeat && isConnect) {
            reConnect();
        }

        if(!isConnect) { alert('websocket 连接失败')}
    };
    const handError = (error) => {
        console.log('Error:', error);
    };
    
    
    const reConnect = () => {
        // 断开重新连接
        // clearInterval(heartBeatTimer);
        init();
    };

    const resetHeartBeat = () => {
        lackHeartBeat = false;
        clearInterval(heartBeatTimer);
        clearTimeout(noPongCloseTimer);
        beginHeartBeat();
    }

    const beginHeartBeat = () => {
        // 为当前心跳检测上锁lackHeartBeat = true， 避免reConnect() 的时候，又重新打开一个心跳检测
        // 设置一个10s 发送心跳信息的机制
        if(lackHeartBeat) return;
        heartBeatTimer = setInterval(() => {
            lackHeartBeat = true;
            ws.send(JSON.stringify({msg: 'Ping'}));
            // 在发送ping之后，3秒之后没有接收到信息，说明server 挂掉了，就会执行ws.close()， 关闭webscoket;
            noPongCloseTimer = setTimeout(() => {
                console.log('no Pong, server 关闭了!');
                // 这个设置是为了， 在发送心跳信息之后， 得不到response 的防止一直走onclose函数中的重连逻辑
                isConnect = false; 
                // 这个地方加上定时器清除， 是因为每次server关闭， heartBeatTimer 没被清除， 所以在关闭websocket的时候，把定时器也清除，
                clearInterval(heartBeatTimer); 
                ws.close();
            }, 3000);
        }, 30000);
    }

    // create the element which is the message lists

    const createMsgListEle = (id, value) => {
        // create the li element
        const liEle = document.createElement('li');
        
        // Distinguish between different sources of information and misplace information
        if(id === user) {
            liEle.style.marginLeft = '300px';
            // liEle.style.list
            // liEle.style = {
            //     marginLeft: '100px',
            // };
        }

        liEle.style.listStyle = 'none'
        const text = `${id}: ${value}`;
        console.log(liEle, 'resp');
        liEle.innerHTML = text;
        ulEle.appendChild(liEle);
    }
    init();

})();