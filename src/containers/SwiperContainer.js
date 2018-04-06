import React, { Component } from 'react'
import Swiper from '../components/Swiper'
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'

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
