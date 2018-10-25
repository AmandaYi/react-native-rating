/*
 * @Description: 星级评论组件
 * @version: 0.1.0
 * @Company: 
 * @Author: AmandaYi
 * @Date: 2018-10-25
 * @LastEditors: AmandaYi
 * @LastEditTime: 2018-10-25 
 */
/**
 * @param {最大星级,如果不传,默认是5,值为5} this.props.maxRating
 * @param {星级,如果不传,默认是满级,值为5} this.props.rating
 * @param {是否可编辑,如果不传,默认是不可编辑,值为false} this.props.editable
 * @param {接收的函数,如果不传递,那么不会传递出去,只会什么都不做} this.props.selectStar
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, ListView } from "react-native";
import globalStyle, {
    width,
    rx
} from "./variable"
const styles = StyleSheet.create({
    vView: {
        position: "relative"
    },
    vRating: {
        flexDirection: "row",
        flexWrap: "wrap",
        width,
    },
    vRatingV: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    vRating_s: {
        zIndex: 1000
    },
    vRating_n: {
        zIndex: 800
    },
    rating: {
        fontFamily: "iconfont",
        fontSize: rx(34),
        color: '#ff6600',
        marginRight: rx(10),
        backgroundColor: "#ffffff",
        alignItems: "flex-start",

    },
    rating_n: {
        color: '#cccccc',
    }
})
export default class Rating extends Component {
    constructor(props) {
        super(props);
        // 定义总星级
        this.maxRating = this.props.maxRating ? this.props.maxRating : 5
        // @param {星级,如果不传,默认是满级,值为5} this.props.rating
        this.rating = this.props.rating <= this.maxRating && this.props.rating >= 0 ? this.props.rating : this.maxRating
        // @param {是否可编辑,如果不传,默认是不可编辑,值为false} this.props.editable
        this.editable = this.props.editable ? this.props.editable : false
        this.ratingArr = []
        this.dSource = (new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
        this.initPage()
        this.state = { rating: this.dSource.cloneWithRows(this.ratingArr) }
        this.props.selectStar = null
    }
    selectStar = (item, Windex) => {
        // 判断是否传入了可编辑
        if (this.editable == true) {
            this.rating = item.level
            this.setRatingChange()
            this.setState({ rating: this.dSource.cloneWithRows(this.ratingArr) })
            // 把值传递出去,如果为真,那么可以作为参数传递出去,如果为假,则无法传递出去
            this.props.selectStar ? this.props.selectStar(item.level) : ""
            return item.level
        } else {
            return false
        }
    }
    componentWillReceiveProps = (nextProps) => {
        this.maxRating = nextProps.maxRating ? nextProps.maxRating : 5
        this.rating = nextProps.rating ? (nextProps.rating >= 0 && nextProps.rating <= this.maxRating ? nextProps.rating : this.maxRating) : this.maxRating
        this.editable = nextProps.editable ? nextProps.editable : false
        this.props.selectStar = nextProps.selectStar ? nextProps.selectStar : null
        this.initPage()
    }
    // 处理函数
    initPage = () => {
        this.setRatingChange()
    }
    // 改变状态
    setRatingChange = () => {
        this.ratingArr = Array.from({ length: this.maxRating }).map((item, index) => {
            if (this.rating <= index + 1) {
                return {
                    status: true,
                    index,
                    level: index + 1
                }
            } else {
                return {
                    status: false,
                    index,
                    level: index + 1
                }
            }
        })
    }
    render = () => {
        return (<View style={styles.vView}>
            <View style={[styles.vRatingV, styles.vRating_s]}>
                <ListView
                    contentContainerStyle={styles.vRating}
                    dataSource={this.state.rating}
                    renderRow={(item, index) => <Text
                        onPress={this.selectStar.bind(this, item, index)}
                        style={[styles.rating, this.rating < item.level ? styles.rating_n : ""]}>&#xe61d;</Text>}
                />
            </View>
        </View>)
    }
}