# Swiper-in-React
手把手教你在 react 中使用 Swiper 4 做轮播图


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





