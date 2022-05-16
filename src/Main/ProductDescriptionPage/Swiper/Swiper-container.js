import React from "react";
import {connect} from "react-redux";
import Swiper from "./Swiper";

let mapStateToProps = (state) => {
    return {
        swiperInfo: state.toolkit.swiperInfo,
        allImgOfProduct:state.toolkit.productDescriptionPage.gallery
    }
}


export default connect(mapStateToProps)(Swiper);