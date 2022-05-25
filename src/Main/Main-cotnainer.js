import {connect} from "react-redux";
import Main from "./Main";

let mapStateToProps = (state) => {
    return {
        allCategories: state.toolkit.categories.allCategories,
        selectedCategory :  state.toolkit.categories.selectedCategory,
        allProducts: state.toolkit.allProductsOfCategory

    }
}


export default connect(mapStateToProps)(Main);