import React, {Component} from 'react';
import styles from './Swiper.module.css'

import buttonNext from './ButtonNext.png'
import buttonPrev from './ButtonPrev.png'

import {onClickSwiperNextButton, onClickSwiperPrevButton, onChangeSelectedImg} from '../../../redux/toolkitSlice'


class Swiper extends Component {
    render() {
        const allImgSwiper = this.props.allImgOfProduct.map((item, id) => {
            return <li key={`${item}${id}`}
                className={item === this.props.swiperInfo.selectedImg ? `${styles.Swiper__listItem} ${styles.Swiper__listItemActive}` : styles.Swiper__listItem}>
                <img src={item} onClick={() => {
                    this.props.dispatch(onChangeSelectedImg(item))
                }}></img>
            </li>
        })

        return (
            <div className={styles.container}>
                <div className={styles.Swiper__container} style={this.props.allImgOfProduct.length<=5 ? {bottom:'0'}:{}}>
                    <button className={styles.Swiper__listButtons}
                            disabled={this.props.swiperInfo.firstVisibleItem === 1}
                            onClick={() => {
                                this.props.dispatch(onClickSwiperPrevButton())
                            }} style={this.props.swiperInfo.allImgLength <= 5 ? {display: 'none'} : {}}>
                        <img src={buttonPrev}/>
                    </button>
                    <div className={styles.Swiper__listContainer}>
                        <ul className={styles.Swiper__list}
                            style={{transform: `translateY(${this.props.swiperInfo.translateY}px)`}}>{allImgSwiper}</ul>
                    </div>
                    <button className={styles.Swiper__listButtons}
                            disabled={this.props.swiperInfo.firstVisibleItem > this.props.swiperInfo.allImgLength - 5}
                            onClick={() => {
                                this.props.dispatch(onClickSwiperNextButton())
                            }} style={this.props.swiperInfo.allImgLength <= 5 ? {display: 'none'} : {}}>
                        <img src={buttonNext}/>
                    </button>
                </div>
                <img src={this.props.swiperInfo.selectedImg} className={styles.container__img}/>
            </div>


        );
    }
}

export default Swiper;     