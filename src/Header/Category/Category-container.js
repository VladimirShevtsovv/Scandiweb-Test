import React from "react";
import {connect} from "react-redux";



import Category from "./Category";

let mapStateToProps = (state) => {
    return {
        allCategories: state.toolkit.categories.allCategories,
        selectedCategory: state.toolkit.categories.selectedCategory,
    }
}


export default connect(mapStateToProps )(Category);