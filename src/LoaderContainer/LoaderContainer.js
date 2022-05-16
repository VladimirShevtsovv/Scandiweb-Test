import React, {Component} from 'react';
import styles from './LoaderContainer.module.css'

class LoaderContainer extends Component {
    render() {
        return (
            <div className={styles.LoaderContainer__Container}>
                {this.props.statusOfLoad === 'pending'  ? <div className={styles.loader}>Загрузка</div> : <div className={styles.LoaderContainer__errorMessage}>Try again later<span>Error: {this.props.errorMessage}</span></div>}
            </div>
        );
    }
}

export default LoaderContainer;