import React, {Component} from 'react';
import styles from "./CurrencySwitcher.module.css";
import {changeSelectedCurrency, openingDropDownMenu, hideDropDownMenu} from './../../redux/toolkitSlice'
import arrow from './Vector.png'
import cartIcon from './cart.png'
import CartOverlay from "../CartOverlay/CartOverlay-container";

class CurrencySwitcher extends Component {

    hideDropDownMenu = () => {
        this.props.dispatch(hideDropDownMenu())
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.hideDropDownMenu)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.hideDropDownMenu);
    }

    render() {
        const allCurrencies = this.props.allCurrencies.map(item => {
            return <li key={item.label}
                       style={this.props.selectedCurrency.name === item.label ? {display: "none"} : {}}
                       onMouseDown={() => {
                           this.props.dispatch(changeSelectedCurrency({name: item.label, symbol: item.symbol}))
                       }
                       }>{item.symbol} {item.label}</li>
        })


        return (
            <div className={styles.CurrencySwitcher}>
                <div className={styles.CurrencySwitcher__container}>
                    <div className={this.props.visibilityOfDropDownMenu === false
                        ? `${styles.CurrencySwitcher__containerWithSelectedCurrency}`
                        : `${styles.CurrencySwitcher__containerWithSelectedCurrency} ${styles.CurrencySwitcher__containerWithSelectedCurrencyActive}`}
                         onMouseDown={(e) => {
                             e.stopPropagation()
                             if (this.props.visibilityOfDropDownMenu === false) {
                                 this.props.dispatch(openingDropDownMenu())
                             } else {
                                 this.props.dispatch(hideDropDownMenu())
                             }
                         }}> {this.props.selectedCurrency.symbol}
                        <img src={arrow}
                             className={this.props.visibilityOfDropDownMenu === false ? `${styles.CurrencySwitcher__arrow}` : `${styles.CurrencySwitcher__arrowImgRotate}`} alt={'arrow'}/>
                    </div>


                    <ul className={this.props.visibilityOfDropDownMenu === false ? `${styles.CurrencySwitcher__list} ${styles.CurrencySwitcher__listHidden}` : `${styles.CurrencySwitcher__list}`}
                        onMouseDown={(e) => {
                            e.stopPropagation()
                            this.props.dispatch(hideDropDownMenu())
                        }}>
                        {allCurrencies}
                    </ul>
                </div>
                <CartOverlay createNewProductToCart={this.props.createNewProductToCart}
                             selectPrice={this.props.selectPrice}
                             createListWithAttribute={this.props.createListWithAttribute}/>
            </div>


        );
    }
}

export default CurrencySwitcher;