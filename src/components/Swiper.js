import React, { Component } from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import './Swiper.css'
// import img1 from '../images/1.jpg'
// import img2 from '../images/2.jpg'
// import img3 from '../images/3.jpg'


class Slideshow extends Component {
    componentDidMount() {
        new Swiper(this.swiperID, {
            pagination: {
                el: this.paginateID,
            },
            observer: true,
        });
    }

    renderList() {
        // let items = [img1, img2, img3]
        const items = this.props.list
        const result = items.map((item, index) => {
            return (
                <li className="swiper-slide" key={index}>
                    <img src={item} alt="" />
                </li>
            )
        })
        return result
    }

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
}

export default Slideshow;