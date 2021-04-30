import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Logger from '@better-mini/logger'

import styles from './index.module.less'

const LOGS = [
  [0, 1, 2, 3],
  { a: 0, b: 1, c: 2 },
  new Date(),
  new Error("Cannot read property 'foo' of undefined"),
  '0123456789',
  9876543210,
  true,
  false,
  undefined,
  null,
  { foo: 'foo', bar: () => {} },
]

export default class Index extends Component {
  index: number = 0

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getDataType(o) {
    if (o === undefined) return 'undefined'
    if (o === null) return 'null'
    if (o.constructor) return o.constructor.name
    return typeof o
  }

  log = () => {
    console.log()
    const logItem = LOGS[this.index]
    Logger.log(`Type: ${this.getDataType(logItem)}`, logItem)
    this.index++
  }

  error = () => {
    const logItem = LOGS[this.index]
    Logger.error(`Type: ${this.getDataType(logItem)}`, logItem)
    this.index++
  }

  logAll = () => {
    Logger.log(...LOGS)
  }

  render() {
    return (
      <View className={styles.page}>
        <View className={styles.btn} onClick={this.log}>
          点击 log 一下
        </View>
        <View className={styles.btn} onClick={this.logAll}>
          点击 log 所有
        </View>
        <View className={styles.btn} onClick={this.error}>
          点击 error 一下
        </View>
        <Logger visible beautify={true} max={100} height={400} />
      </View>
    )
  }
}
