import React, {Component} from 'react';
import {fetchCategoriesAndCurrences} from './../redux/toolkitSlice'
import Category from "./Category/Category-container";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher-container";
import Logo from './a-logo.png'
import  styles from './Header.module.css'

import LoaderContainer from "../LoaderContainer/LoaderContainer-container";

class Header extends Component {

    componentDidMount() {
        this.props.dispatch(fetchCategoriesAndCurrences())
    }

    render() {

        return (

            <React.Fragment>
                {this.props.loadingInfo.fetchCategoriesAndCurrences.status !==null ?
                   <LoaderContainer statusOfLoad={this.props.loadingInfo.fetchCategoriesAndCurrences.status} errorMessage={this.props.loadingInfo.fetchCategoriesAndCurrences.errorMessage}/>
                    :<header className={styles.Header__container}>
                    <Category/>
                     <img src={Logo} alt={'Logo'}/>
                    <div> <CurrencySwitcher createNewProductToCart={this.props.createNewProductToCart}  selectPrice={this.props.selectPrice} createListWithAttribute={this.props.createListWithAttribute}/></div>
                </header>

            }

            </React.Fragment>

        );
    }
}

export default Header;