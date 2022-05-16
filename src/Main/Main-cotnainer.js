import React from "react";
import {connect} from "react-redux";
import Main from "./Main";

let mapStateToProps = (state) => {
    return {
        allProducts: state.toolkit.allProducts,
        allCategories: state.toolkit.categories.allCategories,
        selectedCategory :  state.toolkit.categories.selectedCategory,

    }
}


export default connect(mapStateToProps)(Main);