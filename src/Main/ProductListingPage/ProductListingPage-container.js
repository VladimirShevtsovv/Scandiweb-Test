import React from "react";
import {connect} from "react-redux";



import ProductListingPage from "./ProductListingPage";

let mapStateToProps = (state) => {
    return {
        allProductsOfCategory : state.toolkit.allProductsOfCategory,
        selectedCurrency: state.toolkit.currencies.selectedCurrency,
        selectedCategory: state.toolkit.categories.selectedCategory,
        productsInCart: state.toolkit.productsInCart,
    }
}


export default connect(mapStateToProps )(ProductListingPage);