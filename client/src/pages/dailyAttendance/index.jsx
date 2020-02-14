/* eslint-disable react/sort-comp */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import AttendanceItem from "../../components/attendanceItem"; 
import "./index.less";

export default class Calendar extends Component {
  config = {
    navigationBarTitleText: "每日打卡"
  };

  componentWillMount() {}

  render() {
    return (
      <View className='view-component component-calendar'>
        <View className='daily-date'>
          <View className='date-arrow pre-day'>
            <AtIcon value='chevron-left' size='12' color='#FFF'></AtIcon>
          </View>
          <Text className='date-day'>2020.02.13</Text>
          <View className='date-arrow after-day'>
            <AtIcon value='chevron-right' size='12' color='#FFF'></AtIcon>
          </View>
        </View>
        <View className='attendance-statistics'>
          <View className='box-inner'>
            <View className='sta-detail'>
              <View className='detail-item'>
                <View className='item-text'>
                  <Text className='big-num'>10</Text>天
                </View>
                <View className='item-label'>连续打卡天数</View>
              </View>
              <View className='detail-item'>
                <View className='item-text'>
                  <Text className='big-num'>10</Text>天
                </View>
                <View className='item-label'>累计打卡天数</View>
              </View>
            </View>
          </View>
        </View>
        <View className='attendance-box'>
          <View className='list-box unfinished-list'>
            <View className='list-title'>
              <Text className='title'>今日待打卡</Text>
              <Text className='list-num'>9</Text>
            </View>
            <View className='list-inner'>
                <AttendanceItem />
            </View>
          </View>
          <View className='list-box finished-list'>
            <View className='list-title'>
              <Text className='title'>今日已打卡</Text>
              <Text className='list-num'>9</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
