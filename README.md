# Swiper-in-React
手把手教你在 react 中使用 Swiper 4 做轮播图 <br>
![实例](https://github.com/wmzhong/Swiper-in-React/blob/master/src/images/demo.gif)

## 为啥要写这个东西
项目之前是用的 jq，现在打算用 React 重构，由于原项目已经引用了 Swpier 组件，故自然而然重构项目的时候也就考虑到怎么在 React 中使用这个组件。<br>
由于 Swiper 官方文档并没有针对 React 的例子，而我又是个 React 新手，一下子懵逼，不知道如何使用，现在经过摸索之后，把相关经验总结并分享出来，供后来者参考。

## 搭建 React 环境
1. 安装脚手架 <br>
`npm install -g create-react-app`
2. 搭建项目 swiper-react 项目名字不能大写 <br>
`create-react-app swiper-react`

## 运行环境
在项目目录结构，运行以下命令：

`npm start`

在开发模式下调试项目，将会自动打开本地服务器 [http://localhost:3000](http://localhost:3000)

此时，代码的变动将会实时反映到浏览器中

`npm run build`

在文件夹 `build` 中打包用于生产环境的代码

## 安装 Swiper

`npm install --save swiper`

## 编写 Swiper 组件

1. 首先引入 Swiper 以及样式

``` javascript
import Swiper from 'swiper'

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
## 接下来引用插件的方法如下 <br>

`ReactDOM.render(<Swiper />, document.getElementById('root'))`

以上就是作为一个**展示性组件**如何引入 Swiper 并在 React 中实现轮播图的代码。<br>

## 数据交互轮播图

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




