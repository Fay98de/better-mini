import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import mini from '@better-mini/api/lib/wx'
import Logger from '@better-mini/logger'

import { IStore } from '@/store'

import styles from './index.module.less'

interface IProps {
  store: IStore
}

interface IState {}

@inject('store')
@observer
class Page extends Component<IProps, IState> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  runGetSystemInfo = async () => {
    const systemInfo = await mini.getSystemInfo()
    Logger.log(systemInfo)
  }

  runCanIUse = () => {
    const result = mini.canIUse('showToast')
    Logger.log(result)
  }

  runEnvProp = () => {
    const result = mini.env
    Logger.log(result)
  }

  render() {
    const { store } = this.props
    return (
      <View className={styles.page}>
        <View className="panel">
          <View className="panel__title">开始使用</View>
          <View className="panel__content">
            <View className="block">安装</View>
            <Text className="code block" selectable>
              npm install @better-mini/api
            </Text>
            <View className="block">使用</View>
            <View className="code block">
              <Text className="block">import mini from '@better-mini/api/wx'</Text>
              <Text className="block">&nbsp;</Text>
              <Text className="block">const systemInfo = await mini.getSystemInfo()</Text>
            </View>
          </View>
        </View>
        <View className="panel">
          <View className="panel__title">示例：异步接口</View>
          <View className="panel__content">
            <View className="code block">
              <Text className="block">const systemInfo = await mini.getSystemInfo()</Text>
            </View>
            <View className="example">
              <Text>调用</Text>
              <Text className="code inline">wx.getSystemInfo</Text>
              <AtButton className="example__run" type="secondary" onClick={this.runGetSystemInfo}>
                Run
              </AtButton>
            </View>
          </View>
        </View>
        <View className="panel">
          <View className="panel__title">示例：同步接口</View>
          <View className="panel__content">
            <View className="code block">
              <Text className="block">const result = mini.canIUse('showToast')</Text>
            </View>
            <View className="example">
              <Text>调用</Text>
              <Text className="code inline">wx.canIUse</Text>
              <AtButton className="example__run" type="secondary" onClick={this.runCanIUse}>
                Run
              </AtButton>
            </View>
          </View>
        </View>
        <View className="panel">
          <View className="panel__title">示例：读取属性</View>
          <View className="panel__content">
            <View className="code block">
              <Text className="block">const env = mini.env</Text>
            </View>
            <View className="example">
              <Text>读取</Text>
              <Text className="code inline">wx.env</Text>
              <AtButton className="example__run" type="secondary" onClick={this.runEnvProp}>
                Run
              </AtButton>
            </View>
          </View>
        </View>
        <Logger visible beautify={false} max={50} />
      </View>
    )
  }
}

export default Page
