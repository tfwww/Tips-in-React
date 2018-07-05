/**
 * 使用实例
 * @param {string} type 弹框类型 'confirm' 'prompt' 'tips', 默认 confirm
 * @param {string} text 弹框内容
 * <Dialog
        type={'confirm'}
        text={'您还未开通存管账户！现在去开通吧'}
        sureText={'开通存管账户'}
        cancleText={'暂不开通'}
        callback={() => {
            console.log('sure')
        }}
        cancelFn={() => {
            console.log('cancel')
        }}
    />
 */

import React, { Component } from 'react'
import APP, {log} from '../utils/tool'
import PropTypes from 'prop-types';

const Prompt = (props) => {
    const {type, inputType, placeholder} = props
    if (type === 'prompt') {
        return (
            <div style={{paddingTop: '0.2rem'}} >
                <input className="bees-prompt-input" type={inputType} value={this.state.value} placeholder={placeholder} style={{background: 'none', width: '100%', border: '1px solid #ccc', padding: '0.05rem'}} />
            </div>
        )
    }
    return null
}

const BtnGroup = (props) => {
    const {type, sureText, cancleText, cancelFn, callback, url} = props
    if (type === 'tips') {
        return (
            <div className="fix">
                <a href={url || 'javascript:;'} className="sure" onClick={callback} target={url && '_blank'}>{sureText}</a>
            </div>
        )
    } else {
        return (
            <div className="fix dialog-btn-group" >
                <a href="javascript:;" className="sure" onClick={callback} style={{position:'relative', display: 'block', float: 'left', width: '50%', fontWeight: 'bold', color: '#267eff'}} >
                    <i></i>
                    {sureText}
                </a>
                <a href="javascript:;" className="cancle" onClick={cancelFn} style={{display: 'block', float: 'left', width: '50%', color: '#267eff'}} >{cancleText}</a>
            </div>
        )
    }
}

class Dialog extends Component {
    constructor(props) {
        super(props)
        this.confirm = this.confirm.bind(this)
        this.cancel = this.cancel.bind(this)
        this.clickIcon = this.clickIcon.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.state = {
            align: 'left',
            inputVal: '',
        }
    }

    componentDidMount() {
        const dialogText = document.querySelector('.bees-dialog-text')
        const height = window.getComputedStyle(dialogText, null).height.split('px')[0]
        if (height > 30) {
            this.setState({
                align: 'left'
            })
        } else {
            this.setState({
                align: 'center'
            })
        }
    }

    changeInput(event) {
        this.setState({inputVal: event.target.value});
    }

    confirm() {
        const {callback} = this.props
        const {inputVal} = this.state
        callback && typeof callback === "function" && callback(inputVal)
        APP.closeDialog()
    }

    cancel() {
        const {cancelFn} = this.props
        cancelFn && typeof cancelFn === "function" && cancelFn()
        APP.closeDialog()
    }

    clickIcon() {
        APP.closeDialog()
    }

    renderPrompt() {
        const {type, inputType, placeholder} = this.props
        const {inputVal} = this.state
        if (type === 'prompt') {
            return (
                <div style={{paddingTop: '0.2rem'}} >
                    <input className="bees-prompt-input" type={inputType} value={inputVal} onChange={this.changeInput} placeholder={placeholder} style={{background: 'none', width: '100%', border: '1px solid #ccc', padding: '0.05rem'}} />
                </div>
            )
        }
        return null
    }

    render() {
        const {title, text, type, sureText, cancleText, textAlign, inputType, placeholder, callback, cancelFn, className, url, ...rest} = this.props

        const style = {
            // padding: '0 15px',
            textAlign,
        }
        // const promptAttr = {type, inputType, placeholder}
        const btnAttr = {type, sureText, cancleText, url}
        return (
            <div className={`wm-dialog bees-dialog-fn ${className}`} >
                <div className="wm-dialog-body" >
                    <div style={style}>
                        <div className="bees-dialog-title">{title} <i onClick={this.clickIcon} className="close-icon"></i></div>
                        <div className="bees-dialog-text">{text}</div>
                        {/* <Prompt {...promptAttr} /> */}
                        {this.renderPrompt()}
                    </div>
                    <div className="wm-dialog-division"></div>
                    <BtnGroup callback={this.confirm} cancelFn={this.cancel} {...btnAttr} />
                </div>
            </div>
        )
    }
}

// 为属性指定默认值:
Dialog.defaultProps = {
    title: '',
    text: '',
    url: 'javascript:;',
    cancleText: '取消',
    sureText: '确定',
    cancleUrl: '',
    sureUrl: '',
    type: 'confirm',
    textAlign: 'center',
    callback: null,
    cancelFn: null,
    placeholder: '',
    inputType: 'nubmer'
}

export default Dialog

