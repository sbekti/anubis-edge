import Edge from './edge'
import config from '../config/edge'

const edge = new Edge({
  redis: {
    address: config.REDIS_HOST,
    port: config.REDIS_PORT
  },
  bridge: {
    address: config.BRIDGE_HOST,
    port: config.BRIDGE_PORT
  },
  nodeID: config.NODE_ID
})

edge.connectToBridge()
