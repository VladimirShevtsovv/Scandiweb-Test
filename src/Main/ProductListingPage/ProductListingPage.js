import React, {Component} from 'react';
import styles from './ProductListingPage.module.css'
import {NavLink} from "react-router-dom";
import inCartImg from './Common.png'
import {changeSelectedCategory, fetchProductsOfCategory} from "../../redux/toolkitSlice";


class ProductListingPage extends Component {

    componentDidMount() {
        if (this.props.allProductsOfCategory.length === 0) {
            this.props.dispatch(fetchProductsOfCategory(this.props.id))
        }

    }

    render() {
        let listWithProductsOfCategory = this.props.allProductsOfCategory.map(item => {
            let priceAmount = this.props.selectPrice(item.prices, this.props.selectedCurrency)
            return <li key={item.name} id={item.id}
                       className={item.inStock === false ?
                           `${styles.ProductListingPage__listItemOutOfStock} ${styles.ProductListingPage__listItem}` : `${styles.ProductListingPage__listItem}`}
            >
                <NavLink to={`/PDP-${item.id}`} onClick={(e) => {
                }
                }
                         className={styles.ProductListingPage__listItemLink}>{item.inStock === false ?
                    <span className={styles.ProductListingPage__listItemOutOfStockHeading}>OUT OF STOCK</span> : null}
                    <img src={`${item.gallery[0]}`} className={styles.ProductListingPage__listItemImg}
                         alt={'Product IMG'}/>
                    <span className={styles.ProductListingPage__listItemHeading}>{item.brand} {item.name}</span>
                    <span
                        className={styles.ProductListingPage__listItemPrice}>{this.props.selectedCurrency.symbol} {priceAmount}</span>

                </NavLink>
                <img src={inCartImg} className={styles.ProductListingPage__listItemImgInCart}
                     style={item.inStock === false ? {display: 'none'} : {}}
                     onClick={(e) => {
                         e.stopPropagation()
                         this.props.createNewProductToCart(item, [...this.props.productsInCart])
                     }} alt={'Product IMG to cart'}/>
            </li>
        })

        return (
            <React.Fragment>
                <h1 className={styles.ProductListingPage__heading}>{this.props.selectedCategory ? this.props.selectedCategory[0].toUpperCase() + this.props.selectedCategory.slice(1) : null}</h1>
                <ul className={styles.ProductListingPage__list}>
                    {listWithProductsOfCategory}
                </ul>
            </React.Fragment>

        );
    }
}

export default ProductListingPage;