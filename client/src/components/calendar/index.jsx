/* eslint-disable react/sort-comp */
import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtCalendar } from "taro-ui"
import './index.less'

export default class Calendar extends Component {

    componentWillMount() { }

    render() {
        let { isSwiper, hideArrow, marksList } = this.props;
        return (
            <View className='view-component component-calendar'>
                <AtCalendar isSwiper={isSwiper} hideArrow={hideArrow} marks={marksList} onDayClick={this.dayClick.bind(this)} />
            </View>
        )
    }

    dayClick(item) {
        console.log(item)
    }
}
