import SockJSClient from 'sockjs-client'

class Edge {

  constructor(options) {
    this.options = options
  }

  connectToBridge() {
    const bridge = new SockJSClient(
      `http://${this.options.bridge.address}:${this.options.bridge.port}/bridge`
    )

    bridge.onopen = () => {
      console.log(`Connected to bridge`)

      bridge.send(JSON.stringify({
        'type': 'auth',
        'nodeID': this.options.nodeID
      }))

      if (this.options.nodeID != '8199efdf-2140-46ce-865b-4e94150ae0bf') {
        bridge.send(JSON.stringify({
          'type': 'subscribe',
          'topic': 'test'
        }))
      } else {
        const sendTestMessage = () => {
          bridge.send(JSON.stringify({
            'type': 'data',
            'topic': 'test',
            'payload': 'This is a test message.'
          }))
        }

        setInterval(sendTestMessage, 1000)
      }
    }

    bridge.onmessage = (e) => {
      console.log(`Got message from bridge: ${e.data}`)
    }

    bridge.onclose = () => {
      console.log(`Reconnecting to bridge`)
      setTimeout(this.connectToBridge.bind(this), 1000)
    }
  }

}

export default Edge
