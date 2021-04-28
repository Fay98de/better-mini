import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Button, Text } from '@tarojs/components'
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

  render() {
    const { store } = this.props
    return <View className={styles.page}>Index Page</View>
  }
}

export default Page
