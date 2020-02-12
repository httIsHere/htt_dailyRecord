/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

export default class todoItem extends Component {

  constructor() {
    this.state = {}
  }

  componentWillMount() {
  }

  render() {
    let { type, item } = this.props;
    let bgColor = type == 'index' ? '#bebcb7' : '#f0ede5';
    return (
      <View className={['view-component component-todoItem', type == 'index' ? 'item-index' : '', item.status == 'finished' ? 'item-checked' : '']} onClick={this.changeItemStatus.bind(this)}>
        <View className='item-inner'>
          <View className={['item-check-icon']}>
            <AtIcon value='check' size='8' color={bgColor}></AtIcon>
          </View>
          <View className='item-content'>{item.label}</View>
        </View>
      </View>
    )
  }

  changeItemStatus() {

  }
}
