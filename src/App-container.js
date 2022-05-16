import React from "react";
import {connect} from "react-redux";
import App from "./App";

let mapStateToProps = (state) => {
    return {
        productDescriptionPage: state.toolkit.productDescriptionPage,
        visibilityOfCartOverlay :  state.toolkit.visibilityOfCartOverlay,
        loadingInfo: state.toolkit.loadingInfo,
    }
}


export default connect(mapStateToProps)(App);