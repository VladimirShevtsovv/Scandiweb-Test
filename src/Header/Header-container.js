import {connect} from "react-redux";
import Header from "./Header";

let mapStateToProps = (state) => {
    return {
        loadingInfo: state.toolkit.loadingInfo,

    }
}


export default connect(mapStateToProps)(Header);