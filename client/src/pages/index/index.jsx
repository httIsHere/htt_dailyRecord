/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"
import TabBar from "../../components/tabBar"
import Calendar from "../../components/calendar"
import TodoItem from "../../components/todoItem"
import './index.less'

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '汪汪打卡'
  }

  constructor() {
    this.state = {
      srv_time: '',
      cur_month: '',
      month_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      todo_list: [{
        status: 'unfinished',
        label: '开始打开手机空号大会开始的活动开始计划',
        desc: '',
      }, {
        status: 'finished',
        label: '快速核实客户说看到',
        desc: ''
      }]
    }
  }

  componentWillMount() {
    this.getSrvTime();
  }

  render() {
    let { cur_month, month_list, todo_list } = this.state;
    return (
      <View className='view-box view-index'>
        {/* <Login /> */}
        <View className='view-content'>
          <View className='month-box'>
            <Text className='label'>Month</Text>
            <View className='monthList'>
              {month_list && month_list.map((item, index) => (<Text className={['monthItem', cur_month == item ? 'curMonth' : '']} key={index}>{item}</Text>))}
            </View>
          </View>
          <View className='main-box'>
            <View className='box-inner'>
              <View className='calendar-box'>
                <Calendar isSwiper='false' hideArrow='true' />
              </View>
              <View className='todo-list-box'>
                <View className='todo-title'>Things to do</View>
                <View className='box-list'>
                  {todo_list.length && todo_list.map((item, index) => <TodoItem type='index' key={index} item={item} />)}                  
                </View>
              </View>
            </View>
          </View>
        </View>
        <TabBar tab_current={0} />
      </View>
    )
  }

  getSrvTime = () => {
    const _this = this;
    Taro.cloud
      .callFunction({
        name: "tcbRouter",
        data: {
          $url: "srv-time",
        }
      })
      .then(res => {
        let srv_time = res.result.srvTime;
        // 当前月份
        let _date = new Date(srv_time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var cur_month = _date.getMonth() + 1;
        _this.setState({
          srv_time,
          cur_month
        })
      })
  }
}
