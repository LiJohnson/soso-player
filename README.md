# soso player

用 websock实现多端同步音频播放

## url 参数说明

| 参数名   | 说明                                       | required |
| :------- | :----------------------------------------- | :------- |
| wsUrl    | websocket 服务url(mqtt)                    | Y        |
| username | websocket的用户名                          | N        |
| password | websocket的用户密码                        | N        |
| room     | 房间号，只有这个值一样时才同步播放         | Y        |
| master   | 主播标识，同一room里只有一个人可以设这个值 | N        |
| musicUrl | 音频url地址                                | Y        |

## 示例

### master

http://192.168.3.131:8000/?&wsUrl=ws://lcs:lcs@192.168.1.109:8083/mqtt&username=lcs&password=lcs&master=1&room=soso-player&musicUrl=http://192.168.3.131:8000/1.mp3

### 非master

http://192.168.3.131:8000/?&wsUrl=ws://lcs:lcs@192.168.1.109:8083/mqtt&username=lcs&password=lcs&&room=soso-player&musicUrl=http://192.168.3.131:8000/1.mp3
