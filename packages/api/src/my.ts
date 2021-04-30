import { createApiProxy } from './api-proxy'
import config from './my.config'
import MYProxy from '../types/my'

type TMYProxy = typeof MYProxy

const proxy = createApiProxy<TMYProxy>({ my }, config)

export default proxy
