import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Logger from '@better-mini/logger'

import styles from './index.module.less'

const LOGS = [
  '0123456789',
  9876543210,
  true,
  false,
  undefined,
  null,
  [0, 1, 2, 3],
  { a: 0, b: 1, c: 2 },
  { foo: 'foo', bar: () => {} },
  new Date(),
]

export default class Index extends Component {
  index: number = 0

  componentWillMount() {}

  componentDidMount() {
    const pageInstance = Taro.getCurrentInstance()
    const currentPages = Taro.getCurrentPages()
    console.log(
      'getCurrentInstance',
      pageInstance,
      pageInstance.page?.path,
      pageInstance.page?.options
    )
    console.log('getCurrentPages', currentPages)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  log = () => {
    Logger.log(Date.now(), LOGS[this.index])
    this.index++
  }

  error = () => {
    Logger.error(Date.now(), LOGS[this.index])
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
        <Logger visible beautify={true} max={100} />
      </View>
    )
  }
}
