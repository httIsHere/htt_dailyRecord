import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtTabBar } from 'taro-ui'
import './index.less'

export default class Login extends Component {

  componentWillMount() { }

  render() {
    return (
      <View className='view-component component-tabBar'>
        <View className='btn btn-tab-add'>
          <View className='add-inner'>+</View>
        </View>
        <AtTabBar
          fixed
          color='#c6c6c6'
          backgroundColor='#F0EDE5'
          tabList={[
            { title: '首页', iconType: 'bullet-list', },
            { title: '', iconType: '' },
            { title: '我的', iconType: 'user' }
          ]}
          current={this.props.tab_current}
        />
      </View>
    )
  }
}
