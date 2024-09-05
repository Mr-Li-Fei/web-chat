const ws = require('ws');

const wss = new ws.WebSocketServer({ port: 8080 });
const userArr = [];

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const reqMsg = JSON.parse(data);
        // console.log(reqMsg, 'reqMsg');
        // 收到Ping的信息， 回复Pong, 告诉客户端， server 还活着
        if(reqMsg.msg === 'Ping') {
            return ws.send(JSON.stringify({msg: 'Pong', tag: 'yy'}));
        }
        if(reqMsg.id === 'auth') {
            userArr.push({id: reqMsg.userId, client: ws});
        }

        // judge the id and send msg to the id
        userArr.forEach(user => {
            // find the target ip to send the msg
            if(reqMsg.to === user.id) {
                user.client.send(JSON.stringify({from: reqMsg.from, msg: reqMsg.msg, test: 'run'}));
            }
        })
        // console.log('msg', JSON.parse(data.toString()));
    });
    ws.on('error', console.error);
})

wss.on('close', () => {
    console.log('server.close');
})




