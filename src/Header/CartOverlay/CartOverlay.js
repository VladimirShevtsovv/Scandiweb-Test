import React, {Component} from 'react';
import styles from "./CartOverlay.module.css";
import cartIcon from "../CurrencySwitcher/cart.png";
import {NavLink} from "react-router-dom";
import {hideVisibilityOfCartOverlay, openingVisibilityOfCartOverlay} from "../../redux/toolkitSlice";
import CartPage from "../../Main/CartPage/CartPage-container";

class CartOverlay extends Component {

    hideCartOverlay = () => {
        this.props.dispatch(hideVisibilityOfCartOverlay())
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.hideCartOverlay)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.hideCartOverlay);
    }

    render() {


        return (
            <React.Fragment>
                <div
                    className={this.props.visibilityOfCartOverlay === true ? `${styles.CartOverlay__containerWithCartImg} ${styles.CartOverlay__containerWithCartImgActive}` : styles.CartOverlay__containerWithCartImg}
                    onMouseDown={(e) => {
                        e.stopPropagation()
                        if (this.props.visibilityOfCartOverlay === true) {
                            this.props.dispatch(hideVisibilityOfCartOverlay())
                        } else {
                            this.props.dispatch(openingVisibilityOfCartOverlay())
                        }
                    }}>
                    <img src={cartIcon} className={styles.CartOverlay__containerWithCartImgImg} alt={'Cart Icon'}/>
                    {this.props.productsInCart.length > 0 ?
                        <div className={styles.CartOverlay__amountImg}>{this.props.productsInCart.length}</div> : null}
                    <div onMouseDown={(e) => {
                        e.stopPropagation()
                    }}
                         className={this.props.visibilityOfCartOverlay === true ? styles.CartOverlay__container : `${styles.CartOverlay__container} ${styles.CartOverlay__containerHide}`}>
                        <CartPage createNewProductToCart={this.props.createNewProductToCart}
                                  selectPrice={this.props.selectPrice}
                                  createListWithAttribute={this.props.createListWithAttribute} overlay={'overlay'}/>
                    </div>

                </div>
            </React.Fragment>

        );
    }
}

export default CartOverlay;