import React from 'react';
import preloader from '../../assets/loader.gif';
import styles from './Preloader.module.css'


let Preloader = (props) => {
    return <div className={styles.preloaderContainer}>
        <div className={styles.loader}></div>
    </div>
}


export default Preloader