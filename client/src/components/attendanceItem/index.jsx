import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

export default class Login extends Component {
  componentWillMount() {}

  render() {
    return (
      <View className='view-component component-attendanceItem'>
        <View className='item-inner'>
          <View className='item-detail'>
            <Text className='item-label'>跑步</Text>
            <Text className='item-times'>0/1</Text>
          </View>
          <View className='item-extra'>距离目标∞天</View>
          <View className='item-progress'>
            <View className='progress-color'></View>
          </View>
        </View>
      </View>
    );
  }
}
