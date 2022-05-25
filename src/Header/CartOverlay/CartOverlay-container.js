
import {connect} from "react-redux";
import CartOverlay from "./CartOverlay";

let mapStateToProps = (state) => {
    return {
        productsInCart: state.toolkit.productsInCart,
        visibilityOfCartOverlay: state.toolkit.visibilityOfCartOverlay,
    }
}


export default connect(mapStateToProps)(CartOverlay);