import React, {Component} from 'react';
import ProductListingPage from "./ProductListingPage/ProductListingPage-container";
import styles from './Main.module.css'
import {Route, Routes, Navigate} from "react-router-dom";
import ProductDescriptionPage from "./ProductDescriptionPage/ProductDescriptionPage-container";
import CartPage from "./CartPage/CartPage-container";


class Main extends Component {
    render() {

        const routesOfPDP = this.props.allProducts.map(item => {
            return <Route path={`/PDP-${item.id}`} key={`/PDP-${item.id}`} element={<ProductDescriptionPage id={item.id}
                                                                                    createListWithAttribute={this.props.createListWithAttribute}
                                                                                    createNewProductToCart={this.props.createNewProductToCart}
                                                                                    selectPrice={this.props.selectPrice}/>}></Route>
        })


        const routesOfPLP = this.props.allCategories.map(item => {
            return <Route path={`/PLP-${item.name}`} key={`/PLP-${item.name}`}
                          element={<ProductListingPage  id={item.name} selectPrice={this.props.selectPrice}
                                                       createNewProductToCart={this.props.createNewProductToCart}/>}></Route>
        })

        return (
            <div className={styles.Main__container}>
                <Routes>
                    {routesOfPLP}
                    {routesOfPDP}
                    {this.props.selectedCategory ?
                        <Route path="/" key={'/'} element={<Navigate   to={`PLP-${this.props.selectedCategory}`}/>}/> : null}
                        <Route path='/Cart' key={'/Cart'} element={<CartPage  createNewProductToCart={this.props.createNewProductToCart}
                                                           selectPrice={this.props.selectPrice}
                                                           createListWithAttribute={this.props.createListWithAttribute}/>}></Route>
                        <Route path={'/Thank-you'} key={'/Thank-you'}
                           element={<div  className={styles.ThankYou__container}>THANK YOU FOR ORDER</div>}/>
                </Routes>

            </div>
        );
    }
}

export default Main;