import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"

export default class Login extends Component {
  state = {
    context: {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = (info) => {
    let user_info = info.detail.userInfo;
    Taro.cloud
      .callFunction({
        name: "tcbRouter",
        data: {
          $url: "login",
          user_info
        }
      })
      .then(res => {
        console.log(res)
        this.setState({
          context: res.result
        })
      })
  }

  render() {
    return (
      <View className='view-box view-login'>
        <Button openType='getUserInfo' onGetUserInfo={this.getLogin}>获取登录云函数</Button>
        <Text>context：{JSON.stringify(this.state.context)}</Text>
      </View>
    )
  }
}
