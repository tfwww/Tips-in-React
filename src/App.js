import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
// import Swiper from './components/Swiper';
import SwiperContainer from './containers/SwiperContainer';
import DialogDemo from './pages/DialogDemo';
import {routes} from './routes'
import { renderRoutes } from 'react-router-config'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inx: 0
		}
	}
	handleClick(inx) {
		this.setState({
			inx
		})
	}
    render() {
		const {inx} = this.state
        return (
			<div>
				<button onClick={this.handleClick.bind(this, 0)}>引入并使用插件 demo</button>
				<button onClick={this.handleClick.bind(this, 1)}>配置路由表 demo</button>
				<button onClick={this.handleClick.bind(this, 2)}>配置全局组件 demo</button>
				<section>
					<div> ========== demo ========== </div>
					{inx === 0 && renderRoutes(routes)}
					{inx === 1 && <SwiperContainer />}
					{inx === 2 && <DialogDemo />}
				</section>
			</div>
        );
    }
}

export default App;
