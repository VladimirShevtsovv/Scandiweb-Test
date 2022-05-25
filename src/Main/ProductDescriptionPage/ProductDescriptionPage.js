import React, {Component} from 'react';
import {fetchProductsDiscriptionPage, onChangeAttributes, swiperInDefolState} from '../../redux/toolkitSlice'
import styles from './ProductDescriptionPage.module.css'
import Swiper from "./Swiper/Swiper-container";
import InfoAboutProduct from "./InfoAboutProduct/InfoAboutProduct-container";
import LoaderContainer from "../../LoaderContainer/LoaderContainer-container";
import parse from 'html-react-parser'
import 'util'
import {Buffer} from 'buffer'

window.Buffer = Buffer

class ProductDescriptionPage extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProductsDiscriptionPage(window.location.pathname.slice(5)))
    }

    // Валидация на то , что бы все атрибуты были выбраны, перед добавление в корзину
    validation = (arrayWitAttributes) => {
        let copyArray = [];
        for (let i = 0; i < arrayWitAttributes.length; i++) {
            let obj = {...arrayWitAttributes[i]}
            copyArray.push(obj)
        }
        for (let i = 0; i < copyArray.length; i++) {
            if (copyArray[i].selectedAttribute === null) {
                copyArray[i].errorMessange = `Please select ${copyArray[i].name.toLowerCase()}`
            }
        }
        return copyArray

    }

    componentWillUnmount() {
        this.props.dispatch(swiperInDefolState())
    }

    render() {

        let listWithAttributes = this.props.createListWithAttribute(this.props.productDescriptionPage.attributes, this.props.productDescriptionPage.inStock === false ? 'disabled' : null )
        let price = this.props.selectPrice(this.props.productDescriptionPage.prices, this.props.selectedCurrency)


        return (
            <React.Fragment>
                {this.props.loadingInfo.fetchProductsDiscriptionPage.status !== null ?
                    <LoaderContainer statusOfLoad={this.props.loadingInfo.fetchProductsDiscriptionPage.status}
                                     errorMessage={this.props.loadingInfo.fetchProductsDiscriptionPage.errorMessage}/>

                    : <div className={styles.ProductDescriptionPage__container}>
                        <div className={styles.ProductDescriptionPage__leftContainer}>
                            <Swiper/>
                        </div>
                        <div className={styles.ProductDescriptionPage__rightContainer}>
                            <InfoAboutProduct price={price} listWithAttributes={listWithAttributes}
                                              name={this.props.productDescriptionPage.name}
                                              brand={this.props.productDescriptionPage.brand}
                                              selectedCurrencySymbol={this.props.selectedCurrency.symbol}
                            />
                            <button className={styles.ProductDescriptionPage__button} onClick={() => {
                                this.props.dispatch(onChangeAttributes(this.validation(this.props.productDescriptionPage.attributes)))
                                for (let i = 0; i < this.props.productDescriptionPage.attributes.length; i++) {
                                    if (this.props.productDescriptionPage.attributes[i].selectedAttribute === null) {
                                        return
                                    }
                                }
                                this.props.createNewProductToCart(this.props.productDescriptionPage, [...this.props.productsInCart], 'DescriptionPage')
                            }} disabled={this.props.productDescriptionPage.inStock === false}>{this.props.productDescriptionPage.inStock === false ? `OUT OF STOCK` : `ADD TO CART`}
                            </button>

                            <div
                                className={styles.ProductDescriptionPage__description}>
                                {this.props.productDescriptionPage.description ? parse(this.props.productDescriptionPage.description) : null }

                            </div>

                        </div>
                    </div>

                }


            </React.Fragment>

        );
    }
}

export default ProductDescriptionPage;