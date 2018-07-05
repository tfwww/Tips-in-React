import React, { Component } from 'react'
import tools from '../utils/tools'

class DialogDemo extends Component {
	constructor(props) {
		super(props)
		this.show = this.show.bind(this)
	}

	show() {
		tools.showDialog({
			type: 'tips',
			text: '演示弹框',
		})
	}

    render() {
        return (
            <button onClick={this.show}>点击出现弹窗</button>
        )
    }
}

export default DialogDemo;