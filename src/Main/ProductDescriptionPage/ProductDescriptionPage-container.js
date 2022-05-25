import {connect} from "react-redux";
import ProductDescriptionPage from "./ProductDescriptionPage";

let mapStateToProps = (state) => {
    return {
        productDescriptionPage: state.toolkit.productDescriptionPage,
        selectedCurrency: state.toolkit.currencies.selectedCurrency,
        productsInCart:  state.toolkit.productsInCart,
        loadingInfo:state.toolkit.loadingInfo
    }
}


export default connect(mapStateToProps)(ProductDescriptionPage);