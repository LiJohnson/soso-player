(async (win) => {
    await new Promise(reslove => { let s = document.createElement('script'); s.onload = () => reslove(); s.src = 'https://unpkg.com/mqtt@4.3.7/dist/mqtt.min.js'; document.head.appendChild(s) });
    // const a = document.createElement('a');a.href='/mqtt'
    // const connectUrl = a.href.replace(/^http/,'ws')
    // connectUrl = `ws://lcs:lcs@192.168.1.109:8083/mqtt`
    let  client = {end(){}}
    const init = (param,ondisconnet) => {
        const  {wsUrl,clientId,username,password} = param
        client.end()
        client  = mqtt.connect(wsUrl, {
            clean: true,
            connectTimeout: 30_000,
            clientId,
            username,
            password
        })

        client.on('reconnect', (error) => {
            console.log('正在重连:', error)
            ondisconnet()
        })

        client.on('error', (error) => {
            console.log('连接失败:', error)
            ondisconnet()
        })

        client.on('message', (_topic,message)=>param[_topic] && param[_topic].call(null,JSON.parse(`${message}`)))
        
        Object.keys(param).filter(k=>param[k].call).forEach(topic=>client.subscribe(topic))
        return (topic,msg)=>client.publish(topic,JSON.stringify(msg))
    }
    win.newClient = init
})(this)