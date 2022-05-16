import React, {Component} from 'react';
import styles from "../ProductDescriptionPage.module.css";

class InfoAboutProduct extends Component {
    render() {
        return (
            <div className={styles.InfoAboutProduct__container}>
                <h2 className={this.props.overlay? styles.ProductDescriptionPage__brandOfProductOverlay : styles.ProductDescriptionPage__brandOfProduct}>{this.props.brand}</h2>
                <h2 className={this.props.overlay? styles.ProductDescriptionPage__nameOfProductOverlay : styles.ProductDescriptionPage__nameOfProduct} style={this.props.cart ?{marginBottom:'20px'}:{}}>{this.props.name}</h2>
                {this.props.cart ? <div className={this.props.overlay ? styles.ProductDescriptionPage__priceContainerOverlay : styles.ProductDescriptionPage__priceContainer}>
                    <span>{this.props.selectedCurrencySymbol} {this.props.price}</span>
                </div> : null}
                <ul className={styles.ProductDescriptionPage__attributeList}>{this.props.listWithAttributes}</ul>
                {this.props.cart ? null : <div className={styles.ProductDescriptionPage__priceContainer}>Price:
                    <span>{this.props.selectedCurrencySymbol} {this.props.price}</span>
                </div>}

            </div>
        );
    }
}

export default InfoAboutProduct;