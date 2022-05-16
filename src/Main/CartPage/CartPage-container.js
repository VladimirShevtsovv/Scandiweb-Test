import React from "react";
import {connect} from "react-redux";
import CartPage from "./CartPage";

let mapStateToProps = (state) => {
    return {
        productsInCart: state.toolkit.productsInCart,
        selectedCurrency: state.toolkit.currencies.selectedCurrency,
        totalCartInfo : state.toolkit.totalCartInfo,

    }
}


export default connect(mapStateToProps)(CartPage);