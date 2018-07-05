import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dialog from "../components/Dialog";

let debug = true
const log = debug ? console.log.bind(console) : () => {}
const dialogWrapper = document.createElement('div')

const tools = {
    showDialog: function(config) {
        document.body.appendChild(dialogWrapper);
        ReactDOM.render((
                <Dialog {...config} />
            ),
            dialogWrapper
        )
        if (!document.body.className.includes('preventScroll')) {
            document.body.className += ' preventScroll'
        }
    },
    closeDialog: function() {
        ReactDOM.unmountComponentAtNode(dialogWrapper);
        if (dialogWrapper.parentNode != null) {
            document.body.removeChild(dialogWrapper)
        }
        document.body.className.replace(/\preventScroll\b/g, "")
    },

}

export default tools
export {log}
