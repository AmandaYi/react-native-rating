/*
 * @Description: 常量,写了几个函数
 * @version: 0.1.0
 * @Company: 
 * @Author: AmandaYi
 * @Date: 2018-10-25
 * @LastEditors: AmandaYi
 * @LastEditTime: 2018-10-25 
 */
import {
	Dimensions
} from "react-native";
// 设计稿是750,这里一定要改设计稿的大小
const UIWIDTH = 750;
export const { width, height } = Dimensions.get("window");
export function rx(UIPX) {
	return Math.round(UIPX * width / UIWIDTH);
}

// 二次方程
export function ry(UIPX) {
	return UIPX * 12 / height;
}
export default globalStyle = {
	// 左右的边距的宽度
	appHorizontal: rx(28),
	textColor: "#333333"
}
// 16进制转码RGBA,尽量用16进制来显示UI的颜色,可以用下面的几个函数rgba2Hex
function hex2Rgba(color) {

}
// RGBA转码16进制颜色
export function rgba2Hex(color) {
	let values = color
		.replace(/rgba?\(/, '')
		.replace(/\)/, '')
		.replace(/[\s+]/g, '')
		.split(',');
	let a = parseFloat(values[3] || 1),
		r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
		g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
		b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
	return "#" +
		("0" + r.toString(16)).slice(-2) +
		("0" + g.toString(16)).slice(-2) +
		("0" + b.toString(16)).slice(-2);
}
// 16进制转码RGBA


//  RGB转换成RGBA
export function RGB2RGBA(rgb_color, alp) {
	//注：rgb_color的格式为#FFFFFFF，alp为透明度
	let r = parseInt("0x" + rgb_color.substr(1, 2));
	let g = parseInt("0x" + rgb_color.substr(3, 2));
	let b = parseInt("0x" + rgb_color.substr(5, 2));
	let a = alp;
	return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
//  RGBA转换成RGB
export function RGBA2RGB(rgba_color) {
	//注：rgba_color的格式为rgba(0,0,0,0.1)
	let BGcolur = 1;
	let arr = rgba_color.split("(")[1].split(")")[0].split(",");
	let a = arr[3];
	let r = BGcolur * (1 - a) + arr[0] * a;
	let g = BGcolur * (1 - a) + arr[1] * a;
	let b = BGcolur * (1 - a) + arr[2] * a;
	return "rgb(" + r + "," + g + "," + b + ")";
}

// 跳转页面的函数
export function pushPage(page, param) {
	if (page == "test") {
		alert("测试中");
		return false;
	} else {
		// 跳转页面,进行携带参数
		navigation.navigate(page, {
			// 同名参数
			param
		})
	}
}















































