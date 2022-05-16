import React from "react";
import {connect} from "react-redux";


import CurrencySwitcher from "./CurrencySwitcher"

let mapStateToProps = (state) => {
    return {
        allCurrencies: state.toolkit.currencies.allCurrencies,
        selectedCurrency: state.toolkit.currencies.selectedCurrency,
        visibilityOfDropDownMenu: state.toolkit.currencies.visibilityOfDropDownMenu,

    }
}


export default connect(mapStateToProps)(CurrencySwitcher);