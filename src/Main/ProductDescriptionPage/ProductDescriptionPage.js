import React, {Component} from 'react';
import {fetchProductsDiscriptionPage, onChangeAttributes, swiperInDefolState} from '../../redux/toolkitSlice'
import styles from './ProductDescriptionPage.module.css'
import Swiper from "./Swiper/Swiper-container";
import InfoAboutProduct from "./InfoAboutProduct/InfoAboutProduct-container";
import LoaderContainer from "../../LoaderContainer/LoaderContainer-container";
class ProductDescriptionPage extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProductsDiscriptionPage(this.props.id))
    }

    // Валидация на то, чтобы все атрибуты были выбраны, перед добавлением в корзину

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


        let listWithAttributes = this.props.createListWithAttribute(this.props.productDescriptionPage.attributes)
        let price = this.props.selectPrice(this.props.productDescriptionPage.prices, this.props.selectedCurrency)

        return (

            <React.Fragment>
                {this.props.loadingInfo.fetchProductsDiscriptionPage.status !== null ?
                    <LoaderContainer statusOfLoad={this.props.loadingInfo.fetchProductsDiscriptionPage.status}
                                     errorMessage={this.props.loadingInfo.fetchProductsDiscriptionPage.errorMessage}/>

                    :<div className={styles.ProductDescriptionPage__container}>
                        <div className={styles.ProductDescriptionPage__leftContainer}>
                            <Swiper/>
                        </div>
                        <div className={styles.ProductDescriptionPage__rightContainer}>
                            <InfoAboutProduct price={price} listWithAttributes={listWithAttributes}
                                              name={this.props.productDescriptionPage.name}
                                              brand={this.props.productDescriptionPage.brand}
                                              selectedCurrencySymbol={this.props.selectedCurrency.symbol}/>
                            <button className={styles.ProductDescriptionPage__button} onClick={() => {
                                this.props.dispatch(onChangeAttributes(this.validation(this.props.productDescriptionPage.attributes)))
                                for (let i = 0; i < this.props.productDescriptionPage.attributes.length; i++) {
                                    if (this.props.productDescriptionPage.attributes[i].selectedAttribute === null) {
                                        return
                                    }
                                }
                                this.props.createNewProductToCart(this.props.productDescriptionPage, [...this.props.productsInCart], 'DescriptionPage')
                            }}>ADD TO CART
                            </button>
                            <div dangerouslySetInnerHTML={{__html: this.props.productDescriptionPage.description}}
                                 className={styles.ProductDescriptionPage__description}/>
                        </div>
                    </div>

                }



            </React.Fragment>

        );
    }
}

export default ProductDescriptionPage;