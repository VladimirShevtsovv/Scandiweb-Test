import React, {Component} from 'react';
import styles from './Category.module.css'
import {changeSelectedCategory, fetchProductsOfCategory} from '../../redux/toolkitSlice'
import {NavLink} from "react-router-dom";



class Category extends Component {

    componentDidMount() {

        this.props.dispatch(fetchProductsOfCategory('all'))
    }

    componentDidUpdate() {

        this.props.dispatch(fetchProductsOfCategory(this.props.selectedCategory))
    }

    render() {

        const allCategories = this.props.allCategories.map(item => {
            return <li key={item.name}
                       className={item.name === this.props.selectedCategory ? `${styles.Category__listSelectedItem} ${styles.Category__listItem}` : `${styles.Category__listItem}`}
                       onClick={() => {
                           this.props.dispatch(changeSelectedCategory(item.name))
                       }
                       }>
                <NavLink to={`PLP-${item.name}`}>{item.name.toUpperCase()}</NavLink>
            </li>
        })

        return (
            <ul className={styles.Category__list}>
                {allCategories}
            </ul>
        );
    }
}

export default Category;