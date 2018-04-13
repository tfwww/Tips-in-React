import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Gender from './components/Gender'

const Home = () => (
    <div>
        <Link to={'/Invest'}>一级路由</Link>
        <br />
        <Link to={'/Mine'}>二级路由</Link>
    </div>
)

const Invest = () => (
    <h2>进入了投资页（一级路由）</h2>
)

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

// 静态组件，无法传值
const Info = () => (
    <div>个人资料（二级路由）（静态组件）</div>
)

// 如果路由所对应渲染的组件需要传值的话，可以先包一层，然后再放到路由表里
const GenderWrapper = () => (
    <div>
        <div>性别（二级路由）（组件传值包了一层 wrapper）</div>
        <Gender gender={'男'} />
    </div>
)

// 路由表
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

export {routes}