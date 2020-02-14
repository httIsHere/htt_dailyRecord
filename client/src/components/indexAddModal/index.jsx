/* eslint-disable react/sort-comp */
import Taro, { Component } from "@tarojs/taro";
import { View, Button, Input, Text, Picker } from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import "./index.less";

export default class IndexAddModal extends Component {
  constructor() {
    this.state = {
      label: "",
      times: 1,
      remind_time: ""
    };
  }

  componentWillMount() {}

  render() {
    let { label, times, remind_time } = this.state;
    let { show_modal } = this.props;
    return (
      <View className='view-component component-indexModal'>
        <AtModal isOpened={show_modal} closeOnClickOverlay={false}>
          <AtModalHeader>新的打卡</AtModalHeader>
          <AtModalContent>
            <View className='modal-content'>
              <View className='input-item'>
                <Text className='label'>事项:</Text>
                <Input
                  className='modal-input'
                  type='text'
                  value={label}
                  placeholder='例如跑步，学习...'
                  onInput={this.labelChange.bind(this)}
                />
              </View>
              <View className='input-item'>
                <Text className='label'>次数:</Text>
                <Input
                  className='modal-input number-input'
                  type='number'
                  value={times}
                  placeholder='0'
                  onInput={this.timesChange.bind(this)}
                />
                <Text className='number-units'>次/天</Text>
              </View>
              {/* <View className='input-item'>
                        <Text className='label'>频次</Text>
                        <Input className='modal-input' type='text' value={label} placeholder='例如跑步，学习...' />
                    </View> */}
              <View className='input-item'>
                <Text className='label'>提醒:</Text>
                <Picker mode='time' onChange={this.onTimeChange.bind(this)}>
                  <View className='picker'>
                    {remind_time || "添加"}
                  </View>
                </Picker>
              </View>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeModal.bind(this)}>取消</Button> <Button onClick={this.toAdd.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }

  labelChange(value) {
      this.setState({
          label: value.detail.value
      })
  }
  timesChange(value) {
    this.setState({
        times: value.detail.value
    })
  }
  onTimeChange(value) {
    this.setState({
        remind_time: value.detail.value
    })
  }

  toAdd() {
      const _this = this;
    let { label, times, remind_time } = this.state;
    if(!label) return Taro.showToast({title: '请输入事项名称', icon: 'none'})
    Taro.showLoading();
    Taro.cloud
      .callFunction({
        name: "tcbRouter",
        data: {
          $url: "add-attendance",
          data: {
              label,
              times,
              remind_time
          }
        }
      })
      .then(res => {
          Taro.hideLoading();
        if(res.result.statusCode == 200) {
            Taro.showToast({title: '添加成功', icon: 'success'})
            _this.setState({
                label: '',
                times: 1,
                remind_time: ''
            })
            return _this.closeModal();
        } else {
            Taro.showToast({title: '添加失败', icon: 'none'})
        }
      })
  }

  closeModal() {
      this.props.onCloseModal();
  }
}
