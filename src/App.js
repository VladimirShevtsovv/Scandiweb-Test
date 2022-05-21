import React, {Component} from 'react';
import Header from "./Header/Header-container";
import Main from "./Main/Main-cotnainer";
import styles from './../src/Main/ProductDescriptionPage/ProductDescriptionPage.module.css'
import {changeProductsInCart, onChangeAttributes} from "./redux/toolkitSlice";
import LoaderContainer from "./LoaderContainer/LoaderContainer-container";


class App extends Component {

    // Выбор атрибута на странице товара
    changeArrayWithSelectedAttributes = (id, value, arrayWitAttributes) => {
        let copyArray = [];
        for (let i = 0; i < arrayWitAttributes.length; i++) {
            let obj = {...arrayWitAttributes[i]}
            copyArray.push(obj)
        }
        for (let i = 0; i < copyArray.length; i++) {
            if (copyArray[i].id === id) {
                copyArray[i].selectedAttribute = value;
                copyArray[i].errorMessange = null
                break
            }
        }
        return copyArray
    }

    // Создание списка из всех атрибутов
    createListWithAttribute = (arrayWithAllAttributes, disabled, overlay) => {


        let array = arrayWithAllAttributes.map(item => {
            let arrayWithAttribute = [];
            let nameOfCategory = item.name;
            let selectedAttribute = item.selectedAttribute;
            if (nameOfCategory === 'Color') {
                arrayWithAttribute = item.items.map(item => {
                    return <li key={item.id}
                               className={selectedAttribute === item.value ?
                                   `${overlay ? styles.ProductDescriptionPage__colorBoxOverlay : styles.ProductDescriptionPage__colorBox} ${styles.ProductDescriptionPage__colorBoxSelected}` : `${overlay ? styles.ProductDescriptionPage__colorBoxOverlay : styles.ProductDescriptionPage__colorBox}`}
                               onClick={() => {
                                   if (!disabled) {
                                       this.props.dispatch(onChangeAttributes(this.changeArrayWithSelectedAttributes(nameOfCategory, item.value, this.props.productDescriptionPage.attributes)))
                                   }
                               }}
                               style={disabled ? {pointerEvents: 'none'} : {}}
                    >
                        <div style={{backgroundColor: item.value}}></div>
                    </li>
                })
            } else {
                arrayWithAttribute = item.items.map(item => {
                    return <li key={item.id} className={selectedAttribute === item.value ?
                        `${overlay ? styles.ProductDescriptionPage__attributeBoxOverlay : styles.ProductDescriptionPage__attributeBox} ${styles.ProductDescriptionPage__attributeBoxSelected}` : `${overlay ? styles.ProductDescriptionPage__attributeBoxOverlay : styles.ProductDescriptionPage__attributeBox}`}
                               onClick={() => {
                                   if (!disabled) {
                                       this.props.dispatch(onChangeAttributes(this.changeArrayWithSelectedAttributes(nameOfCategory, item.value, this.props.productDescriptionPage.attributes)))
                                   }
                               }}
                               style={disabled ? {pointerEvents: 'none'} : {}}>
                        {item.value}
                    </li>
                })
            }

            return <li key={`container-${item.name}`} className={styles.ProductDescriptionPage__attributeListItem}>
                <h3 className={overlay ? styles.ProductDescriptionPage__attributeHeadingOverlay : styles.ProductDescriptionPage__attributeHeading}>
                    {item.name}:
                </h3>
                <ul className={styles.ProductDescriptionPage__attributeListWithBoxes}>{arrayWithAttribute}</ul>
                {item.errorMessange ? <div
                    className={styles.ProductDescriptionPage__attributeListItemError}>{item.errorMessange}</div> : null}
            </li>

        })

        return array
    }

    // Изменение цены в зависимости какая выбранна в header
    selectPrice = (arrayWithAllPrices, selectedPrice) => {
        let price;
        for (let i = 0; i < arrayWithAllPrices.length; i++) {
            if (arrayWithAllPrices[i].currency.label === selectedPrice.name) {
                price = arrayWithAllPrices[i].amount
                break
            }
        }
        return price
    }

    // Добавление продукта в корзину
    createNewProductToCart = (infoOfProduct, arrayWithAllProducts, page) => {
        let coppyArray = []
        for (let i = 0; i < arrayWithAllProducts.length; i++) {
            coppyArray.push({...arrayWithAllProducts[i]})
        }
        const obj = {
            brand: infoOfProduct.brand,
            name: infoOfProduct.name,
            prices: infoOfProduct.prices,
            amount: 1,
            selectedAttributes: [],
            allAttributes: infoOfProduct.attributes,
            gallery: infoOfProduct.gallery,
            id: arrayWithAllProducts.length > 0 ? arrayWithAllProducts[arrayWithAllProducts.length - 1].id + 1 : 1,
        }
        for (let i = 0; i < infoOfProduct.attributes.length; i++) {
            const objWithAttributeInfo = {
                name: infoOfProduct.attributes[i].name,
                selectedAttribute: page ? infoOfProduct.attributes[i].selectedAttribute : infoOfProduct.attributes[i].items[0].value,
                items: infoOfProduct.attributes[i].items,
            }
            obj.selectedAttributes.push(objWithAttributeInfo)

        }
        if (coppyArray.length > 0) {
            for (let i = 0; i < coppyArray.length; i++) {
                if (coppyArray[i].name === obj.name) {
                    if (obj.selectedAttributes === 0) {
                        coppyArray[i].amount += 1
                        this.props.dispatch(changeProductsInCart(coppyArray))
                        return
                    } else {
                        let arrayq = [];
                        let arrayw = [];
                        for (let j = 0; j < obj.selectedAttributes.length; j++) {
                            arrayq.push(obj.selectedAttributes[j].selectedAttribute)
                            arrayw.push(coppyArray[i].selectedAttributes[j].selectedAttribute)
                        }
                        if (arrayq.sort().join('') === arrayw.sort().join('')) {
                            coppyArray[i].amount += 1;
                            this.props.dispatch(changeProductsInCart(coppyArray));
                            return;
                        }
                    }
                }
            }
        } else {
            coppyArray.push(obj)
            this.props.dispatch(changeProductsInCart(coppyArray))
            return;
        }
        coppyArray.push(obj)
        this.props.dispatch(changeProductsInCart(coppyArray))

    }


    render() {

        return (
            <div className={styles.App} style={this.props.visibilityOfCartOverlay === true ? {position:'fixed'}:{}}>
                <Header createListWithAttribute={this.createListWithAttribute} selectPrice={this.selectPrice}
                        createNewProductToCart={this.createNewProductToCart}/>


                {this.props.loadingInfo.fetchProductsOfCategory.status !== null ?

                    <LoaderContainer statusOfLoad={this.props.loadingInfo.fetchProductsOfCategory.status}
                                     errorMessage={this.props.loadingInfo.fetchProductsOfCategory.errorMessage}/>

                    :
                    <React.Fragment>
                        <Main createListWithAttribute={this.createListWithAttribute} selectPrice={this.selectPrice}
                              createNewProductToCart={this.createNewProductToCart}/>
                        {this.props.visibilityOfCartOverlay === true ?
                            <div className={styles.CartOverlay__backgroundContainer}></div> : null}
                    </React.Fragment>
                }


            </div>


        );
    }


}

export default App;
