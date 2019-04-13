# vue-hmt
[![npm](https://img.shields.io/npm/v/vue-hmt.svg?color=success&style=popout-square)](https://www.npmjs.org/package/vue-hmt) [![npm bundle size](https://img.shields.io/bundlephobia/min/vue-hmt.svg?style=popout-square)](https://www.npmjs.org/package/vue-hmt) [![npm](https://img.shields.io/npm/dt/vue-hmt.svg?color=important&style=popout-square)](https://npmcharts.com/compare/vue-hmt?minimal=true)

VUE百度统计插件
> 项目参考：https://github.com/raychenfj/vue-uweb

## 安装

``` bash
npm install --save vue-hmt
```
## 引入
在 main.js 中写入以下内容：

``` js
import Vue from 'vue'
import router from './router' // vue-router 实例
import hmt from 'vue-hmt'

const options = {
  siteId: 'siteId',
  debug: true,
  autoPageview: false
}

Vue.use(hmt, { options, router })
```

### 插件注册说明

| 参数        | 是否必填           |  说明  |
| ------------- |:-------------:| -----|
| hmt      | 是 | vue-hmt 实例 |
| options      | 是      |   详见options 参数说明 |
| router | 否      | vue-router 实例，不填则路由变换不会自动trackPageview |
### options 参数说明
| 参数        | 是否必填           | 类型  | 说明  |备注  |
| ------------- |:---------:| :-----:|-----|-----|
| siteId      | 是 | String |统计网站唯一ID||
| debug      | 否      |   Boolean |默认 false,开启后会在控制台打印统计传递的参数|请勿在生产环境中使用|
| autoPageview | 否      |    Boolean |默认 true,开启后会自动统计当前页面的PV|可配合trackPageview自定义要统计页面的URL|

## 使用
### 实例方法
#### trackPageview
用于发送某个指定URL的PV统计请求,通常用于AJAX页面的PV统计。
##### 用法
``` js
this.$hmt.trackPageview(pageURL)
```
##### 举个栗子
``` js
this.$hmt.trackPageview('/login')
```
##### 参数
| 参数        | 是否必填    | 类型  | 说明  |备注  |
| ------------- |:---------:| :-----:|-----|-----|
| pageURL      | 是 | String |指定要统计PV的页面URL|必须是以"/"（斜杠）开头的相对路径|

#### trackEvent
用于触发某个事件，如某个按钮的点击，或播放器的播放/停止，以及游戏的开始/暂停等。
##### 用法
``` js
this.$hmt.trackEvent('category', 'action', 'opt_label', 'opt_value')
```
##### 举个栗子
``` js
this.$hmt.trackEvent('musicFile', 'download', 'Rolling In The Deep - Adele')
```
##### 参数
| 参数        | 是否必填    | 类型  | 说明  |备注  |
| ------------- |:---------:| :-----:|-----|-----|
| category      | 是 | String |要监控的目标的类型名称|不填或填"-"的事件会被抛弃|
| action      | 是 | String |用户跟网页进行交互的动作名称|不填或填"-"的事件会被抛弃|
| opt_label      | 否 | String |事件的一些额外信息|不填或填"-"代表此项为空|
| opt_value      | 否 | Number |跟事件相关的数值| - |

### 指令
#### track-event
使用指令 v-track-event 监听事件， 通过 argument 指定事件类型，将自动为绑定元素添加事件监听，当事件触发调用统计代码。 如不指定事件，默认监听 click 事件。
##### 用法
``` html
<button v-track-event:click="'category, action, opt_label, opt_value'"></button>
```
##### 举个栗子
``` html
<button v-track-event:click="'musicFile, download, Rolling In The Deep - Adele'"></button>
```
