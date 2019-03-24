# vue-hmt
VUE百度统计插件
> 项目参考：https://github.com/raychenfj/vue-uweb

## 安装

``` bash
npm install --save vue-hmt
```
## 引入
在 main.js 中写入以下内容：

``` bash
import Vue from 'vue'
import router from './router' // vue-router 实例
import hmt from 'vue-hmt'

const options = {
  siteId: 'siteId',
  debug: true,
  autoPageview: false
}

Vue.use(hmt, options, router)
```
### 使用说明

| 参数        | 是否必填           |  说明  |
| ------------- |:-------------:| -----|
| hmt      | 是 | vue-hmt 实例 |
| options      | 是      |   详见options 参数说明 |
| router | 否      | vue-router 实例，填写后路由变换会自动trackPageview |
### options 参数说明
| 参数        | 是否必填           | 默认  | 说明  |备注  |
| ------------- |:---------:| -----:|-----|-----|
| siteId      | 是 |  |||
| debug      | 否      |   false |||
| autoPageview | 否      |    true ||可配合trackPageview使用|
