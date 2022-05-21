import React, {Component} from 'react';
import InfoAboutProduct from "../ProductDescriptionPage/InfoAboutProduct/InfoAboutProduct-container";
import styles from './CartPage.module.css'
import {
    productInCartDecrement,
    productInCartIncrement,
    setTotalCartInfo,
    hideVisibilityOfCartOverlay,
    changeProductsInCart
} from "../../redux/toolkitSlice";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css'
import {Navigation} from "swiper";
import minusImg from "./Minus.png"
import plusImg from "./Plus.png"
import {NavLink} from "react-router-dom";


class CartPage extends Component {


    removeProductFromCart = (allProductInCart, id) => {

        let copyArray = []
        let index
        for (let i = 0; i < allProductInCart.length; i++) {
            copyArray.push({...allProductInCart[i]})
        }
        for (let i = 0; i < allProductInCart.length; i++) {
            if (allProductInCart[i].id === id) {
                index = allProductInCart.indexOf(allProductInCart[i])

            }
        }
        copyArray.splice(index, 1)
        return (copyArray)


    }

    componentDidUpdate() {
        this.updateTotalInfo()
    }
    // Расчет общей стоимости и dispatch d state информации об общей стоимости
    updateTotalInfo = () => {
        let totalPrice = null;
        let quantity = null;
        this.props.productsInCart.forEach(item => {
            let price = this.props.selectPrice(item.prices, this.props.selectedCurrency)
            totalPrice += price * item.amount
            quantity += item.amount
        })
        let totalTax = this.props.totalCartInfo.taxPercent / 100 * totalPrice
        this.props.dispatch(setTotalCartInfo({
            quantity: quantity,
            totalPrice: totalPrice === null ? totalPrice : totalPrice.toFixed(2),
            totalTax: totalTax,
        }))
    }

    render() {


        // Создание списка товаров находящихся в корзине
        let arrayWithAllProductsInCart = this.props.productsInCart.map((item, id) => {

            let listWithAttributes = this.props.createListWithAttribute(item.selectedAttributes, 'disabled', this.props.overlay)
            let price = this.props.selectPrice(item.prices, this.props.selectedCurrency)
            let swiperSlides = item.gallery.map(item => {
                return <SwiperSlide tag={'li'} style={this.props.overlay ? {width: '120px'} : {}} key={item}>
                    <img src={item} className={this.props.overlay ? styles.CartPage__swipeImg : ''} alt={'Slider IMG'}/>
                </SwiperSlide>
            })
            return <li className={styles.CartPage__listItem} key={`${item.name}${item.id}`}
                       style={this.props.overlay ? {border: 'none', paddingTop: '16px'} : {}}>
                <InfoAboutProduct price={price} listWithAttributes={listWithAttributes}
                                  name={item.name}
                                  brand={item.brand}
                                  selectedCurrencySymbol={this.props.selectedCurrency.symbol}
                                  cart={'cart'}
                                  overlay={this.props.overlay}
                />
                <React.Fragment>
                    <div
                        className={this.props.overlay ? styles.CartPage__containerWithAmountOverlay : styles.CartPage__containerWithAmount}>
                        <button onClick={() => {
                            this.props.dispatch(productInCartIncrement(this.props.productsInCart.indexOf((item))))
                        }
                        }>
                            <img src={plusImg} alt={'Plus Product Img'}/>
                        </button>
                        <span>{item.amount}</span>
                        <button onClick={() => {
                            this.props.dispatch(productInCartDecrement(this.props.productsInCart.indexOf((item))))
                            if (item.amount === 1) {
                                this.props.dispatch(changeProductsInCart(this.removeProductFromCart(this.props.productsInCart, item.id)))
                            }

                        }
                        }>
                            <img src={minusImg} alt={'Minus Product Img'}/>
                        </button>
                    </div>
                    <Swiper tag={'ul'} modules={[Navigation]} navigation={!this.props.overlay}
                            className={this.props.overlay ? styles.CartPage__swiper : ''}>{swiperSlides}</Swiper>
                </React.Fragment>
            </li>
        })

        return (
            <div style={{maxHeight: 'calc(100vh - 80px)',
                overflow: 'auto', width:'100%', padding:'0 16px', overflowX:'hidden'}}>
                {this.props.overlay ? this.props.productsInCart.length ? <div
                        className={styles.CartPage__cartOverlayHeading}>MyBag, <span>{this.props.totalCartInfo.quantity} items</span>
                    </div> : '' :
                    <h1>Cart</h1>}
                {this.props.productsInCart.length > 0 ?
                    <React.Fragment>
                        <ul className={styles.CartPage__list}
                            style={this.props.overlay ? {border: 'none'} : {}}>{arrayWithAllProductsInCart}</ul>
                        {this.props.overlay ?
                            <div className={styles.CartPage__totalContainerOverlay}>
                                <div>Total:</div>
                                <div>{this.props.selectedCurrency.symbol}{this.props.totalCartInfo.totalPrice}</div>
                            </div> :
                            <div className={styles.CartPage__totalContainer}>
                                <div>
                                    <div>Tax:{this.props.totalCartInfo.taxPercent}%:</div>
                                    <div>Quantity:</div>
                                    <div>Total:</div>
                                </div>
                                <div className={styles.CartPage__totalContainerRight}>
                                    <div>{this.props.selectedCurrency.symbol}{this.props.totalCartInfo.totalTax.toFixed(2)}</div>
                                    <div>{this.props.totalCartInfo.quantity}</div>
                                    <div>{this.props.selectedCurrency.symbol}{this.props.totalCartInfo.totalPrice}</div>
                                </div>
                            </div>
                        }

                        {this.props.overlay ?
                            <div className={styles.CartPage__cartOverlayContainerWithButton}>
                                <NavLink to={'/Cart'} className={styles.CartPage__cartOverlayButtonToBag}
                                         onClick={() => {
                                             this.props.dispatch(hideVisibilityOfCartOverlay())
                                         }
                                         }>VIEW BAG</NavLink>
                                <NavLink to={'/Thank-you'} className={styles.CartPage__cartOverlayButtonOrder}
                                         onClick={() => {
                                             this.props.dispatch(hideVisibilityOfCartOverlay())
                                         }}>ORDER</NavLink>

                            </div> :
                            <NavLink to={'/Thank-you'} className={styles.CartPage__orderButton}>ORDER</NavLink>
                        }
                    </React.Fragment>
                    :
                    <div className={styles.CartPage__cartOverlayEmptyState}>
                        Your cart is empty
                    </div>}


            </div>
        );
    }
}

export default CartPage;