这是我在用 React 重构项目的过程中，踩过的一些坑。<br>
如果有哪里说得不准确的地方，欢迎指正。

## 目录
- [引入并使用JS插件](#引入并使用插件)
- [配置路由表](#配置路由表)

### 搭建 React 环境
1. 安装脚手架 <br>
`npm install -g create-react-app`
2. 搭建项目 swiper-react 项目名字不能大写 <br>
`create-react-app swiper-react`

以后的例子都是用的此脚手架搭建的环境，将不再做赘述。

---

### 运行环境
在项目目录结构，运行以下命令：

`npm start`

在开发模式下调试项目，将会自动打开本地服务器 [http://localhost:3000](http://localhost:3000)

此时，代码的变动将会实时反映到浏览器中

`npm run build`

在文件夹 `build` 中打包用于生产环境的代码

---

## 引入并使用插件
以 Swiper 为例，手把手教你在 React 中使用 Swiper 4 做轮播图 <br>
![实例](https://github.com/wmzhong/Swiper-in-React/blob/master/src/images/demo.gif)

### 为啥要写这个东西
项目之前是用的 jq，现在打算用 React 重构，由于原项目已经引用了 Swpier 组件，故自然而然重构项目的时候也就考虑到怎么在 React 中使用这个组件。<br>
由于 Swiper 官方文档并没有针对 React 的例子，而我又是个 React 新手，一下子懵逼，不知道如何使用，现在经过摸索之后，把相关经验总结并分享出来，供后来者参考。


### 安装 Swiper

`npm install --save swiper`

### 编写 Swiper 组件

1. 首先引入 Swiper 以及样式

``` javascript
// 引入此路径，才不会打包失败
import Swiper from 'swiper/dist/js/swiper.js'

import 'swiper/dist/css/swiper.min.css'
```
2. 在组件挂载完毕的时候生成 Swiper 对象

``` javascript
componentDidMount() {
    new Swiper(this.swiperID, {
        pagination: {
            el: this.paginateID,
        },
    });
}
```

`this.swiperID` 和 `this.paginateID` 本来应该是 HTML 元素或者相应的元素选择器字符串，如 '#swiper' <br>
在 React 中我用了 ref 方法去引用已到达引用元素的效果。

3. 在 React 的 render 方法构造 html 结构，注意 ref 的引用

``` javascript
render() {
    const items = this.renderList()
    return (
        <div className="wxchat-banner">
            <section className="new_custom swiper-container index_tab_con" ref={self => this.swiperID = self}>
                <ul className="swiper-wrapper">
                    {items}
                </ul>
                <div className="swiper-pagination banner-pagination" ref={self => this.paginateID = self}></div>
            </section>
        </div>
    )
}
```
### 接下来引用插件的方法如下 <br>

`ReactDOM.render(<Swiper />, document.getElementById('root'))`

以上就是作为一个**展示性组件**如何引入 Swiper 并在 React 中实现轮播图的代码。<br>

### 数据交互轮播图

如果作为有数据交互的轮播图，我们应该再写一个**容器组件**来获取数据然后更新到上面写的**展示性组件**中。

1. 编写容器组件

数据通过 states 传给子组件 Swiper

``` javascript
class SwiperContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        // 这里只是写死数据，一般实际项目是用接口获取数据
        // const url = '/xxxx/xxxxx'
        // fetch(url).then(res => res.json()).then(
        //     (result) => {
        //         this.setState({
        //             list: result.list
        //         })
        //     },
        //     (error) => {
        //         this.setState({
        //             error
        //         });
        //     }
        // )
        this.setState({
            list: [img1, img2, img3]
        })
    }

    render() {

        const {list} = this.state
        return (
            <Swiper list={list} />
        )
    }
}

export default SwiperContainer
```

2. 改动展示性组件
在 `componentDidMount` 周期函数中，添加 `observer: true,` 这一配置项。

**这一点非常重要，如果不添加的话，Swiper 无法检测到数据变动，轮播图显示的就一直只有一张图片。**

当初为了修复这个坑可是研究了好久！！！

---
最后，为啥要特地编写容器组件去获取数据，然后再传递给 Swiper 组件呢？ <br>
这么做是为了 Swiper 可以在多处地方复用，如果这个组件里面包含了数据交互，那么必然无法达到复用的要求，还需要再做改动。

---

## 配置路由表
### 效果图
![实例](https://github.com/wmzhong/Swiper-in-React/blob/master/src/images/route_config.gif)

### 为啥要写这个东西
网上已经有很多文章阐述如何配置路由表，但是有些过时，且文章代码已经不能使用，故记录下自己配置路由表的过程。

### 安装依赖
1. 安装 React Router 4 <br>
`npm install --save react-router-dom`
2. 安装 React Router Config, 配置路由表必须 <br>
`npm install --save react-router-config`

### 配置路由表
``` javascript
const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    }, {
        path: '/Invest',
        component: Invest,
    }, {
        path: '/Mine',
        component: Mine,
        routes: [
            {
                path: '/Mine/Info',
                component: Info
            }, {
                path: '/Mine/Gender',
                component: GenderWrapper
            }
        ]
    }
]
```
1. **值得注意的是，路由表的 component，如果拥有子路由，则需添加 `renderRoutes` 函数：**
``` javascript
const Mine = ({route}) => (
    <div>
        <h2>进入了资料页（一级路由）</h2>
        <Link to={'/Mine/Info'}>资料</Link>
        <br />
        <Link to={'/Mine/Gender'}>性别</Link>
        {/* 如果有子路由，必须使用此函数，否则子路由对应的组件不会渲染 */}
        {renderRoutes(route.routes)}
    </div>
)
```

2. **对于一些静态组件，没有数据传递的，可以如下直接定义：**
``` javascript
// 静态组件，无法传值
const Info = () => (
    <div>个人资料（二级路由）（静态组件）</div>
)
```

3. **那如果组件需要值传递，那么就需要包一层，再传入到路由表里：**
> 假设我们现在有个组件 Gender 显示用户性别 Gender.js
``` javascript
import React, { Component } from 'react'

class Gender extends Component {
    render() {
        return (
            <div>{this.props.gender}</div>
        )
    }
}

export default Gender;
```
> 这个时候怎么把这个组件放到路由表里面呢，毕竟组件需要传值 `<Gender gender={'男'} />` <br>
我们可以选择将这个组件包一层：

``` javascript
// 如果路由所对应渲染的组件需要传值的话，可以先包一层，然后再放到路由表里
const GenderWrapper = () => (
    <div>
        <div>性别（二级路由）（组件传值包了一层 wrapper）</div>
        <Gender gender={'男'} />
    </div>
)
```

4. 而对于整个应用入口则为如下：
``` javascript
ReactDOM.render(
    <HashRouter>
        {renderRoutes(routes)}
    </HashRouter>,
    document.getElementById('root')
);
```
直接通过 routes 路由表来渲染整个应用。
