import React from 'react'
import Taro, { pxTransform } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { LoggerProps, LoggerState } from '../../../types/logger'
import cls from 'classnames'

function getCurrentPageId() {
  const currentInstance = Taro.getCurrentInstance()
  const { page } = currentInstance
  // 不同平台的页面 id 取值不一样
  const pageId = (page as any).$id || (page as any).__wxExparserNodeId__
  return String(pageId)
}

class Logger extends React.PureComponent<LoggerProps, LoggerState> {
  static LOG_MAX: number = 30
  static HEIGHT: number = 400
  static instances: Record<string, Logger> = {}

  static defaultProps = {
    visible: false,
    beautify: true,
    max: Logger.LOG_MAX,
    height: 400,
  }

  static getLogger() {
    const pageId = getCurrentPageId()
    const logger = Logger.instances[pageId]
    if (!logger) {
      throw new Error('Logger component is not found, seems it is not add to the page?')
    }
    return logger
  }

  static log(...args) {
    const logger = this.getLogger()
    logger.handleLog('log', args)
  }

  static error(...args) {
    const logger = this.getLogger()
    logger.handleLog('error', args)
  }

  state: LoggerState = {
    expand: true,
    logs: [],
  }

  constructor(props: LoggerProps) {
    super(props)
    if (typeof props.expand !== 'undefined') {
      this.state.expand = props.expand
    }
    this.init()
  }

  init() {
    const pageId = getCurrentPageId()
    Logger.instances[pageId] = this
  }

  private stringify(o) {
    const { beautify } = this.props
    if (typeof o === 'undefined') return 'undefined'
    if (typeof o === 'string') return o
    if (o instanceof Error) return o.toString()
    return beautify ? JSON.stringify(o, undefined, '\u00a0\u00a0') : JSON.stringify(o)
  }

  handleLog(type: 'log' | 'error', args: any[]) {
    const { visible, beautify, max = Logger.LOG_MAX } = this.props
    if (!visible) return
    const logArgs = args.map((o) => {
      return this.stringify(o)
    })
    const id = `log-${Date.now()}`
    const log = { id, type, text: logArgs.join(beautify ? '\r\n' : '\u00a0\u00a0') }
    let logs = [...this.state.logs]
    logs.push(log)
    const start = Math.max(logs.length - max, 0)
    logs = logs.slice(start)
    this.setState({ currentLogId: id, logs })
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  clear = () => {
    this.setState({ logs: [] })
  }

  render() {
    const { className, visible, height } = this.props
    const { expand, currentLogId, logs } = this.state

    if (!visible) return null

    return (
      <View {...this.props} className={cls('logger-view', className, { expand })}>
        <ScrollView
          className="logger-list"
          style={{ height: expand ? pxTransform(height!) : 0 }}
          scrollY
          scrollIntoView={currentLogId}
        >
          {logs.map((log, index) => (
            <Text
              key={index}
              id={log.id}
              className={cls('logger-text', log.type)}
              style={{ backgroundColor: index % 2 ? '#eee' : undefined }}
              selectable
            >
              {log.text}
            </Text>
          ))}
        </ScrollView>
        <View className="logger-btn btn-toggle" onClick={this.toggle}>
          {expand ? '收起' : '展开'}
        </View>
        <View className="logger-btn btn-clear" onClick={this.clear}>
          清空
        </View>
      </View>
    )
  }
}

export default Logger
