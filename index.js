(async (win) => {
    await new Promise(reslove => { let s = document.createElement('script'); s.onload = () => reslove(); s.src = 'https://unpkg.com/mqtt@4.3.7/dist/mqtt.min.js'; document.head.appendChild(s) });
    // const a = document.createElement('a');a.href='/mqtt'
    // const connectUrl = a.href.replace(/^http/,'ws')
    connectUrl = `ws://192.168.1.109:8083/mqtt`
    let  client = {end(){}}
    const init = (clientId,topic,cb) => {
        client.end()
        client  = mqtt.connect(connectUrl, {
            clean: true,
            connectTimeout: 30_000,
            clientId,
            username: 'lcs',
            password: 'lcs',
        })

        client.on('reconnect', (error) => {
            console.log('正在重连:', error)
        })

        client.on('error', (error) => {
            console.log('连接失败:', error)
        })

        client.on('message', (topic, message) => {
            console.log('收到消息：', topic, message)
        })
        cb && client.on('message', (topic,message)=>cb(JSON.parse(`${message}`)))
        
        client.subscribe(topic)
        console.log(client)
        return msg=>client.publish(topic,JSON.stringify(msg))
    }
    win.newClient = init
})(this)