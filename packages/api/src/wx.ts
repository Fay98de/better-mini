import { createApiProxy } from './api-proxy'
import config from './wx.config'
import WXProxy from '../types/wx'

type TWXProxy = typeof WXProxy

const proxy = createApiProxy<TWXProxy>({ wx }, config)

export default proxy
