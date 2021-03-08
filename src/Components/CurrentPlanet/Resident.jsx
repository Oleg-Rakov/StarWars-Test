import React from 'react';
import styles from './CurrentPlanet.module.css';



export default function Resident({ residentInfo }) {
    return (
        <div className={styles.selectName}>
            <select>
                <option >{residentInfo.name}</option>
                <option >{residentInfo.height}</option>
                <option >{residentInfo.mass}</option>
                <option >{residentInfo.gender}</option>
            </select>
        </div>
    );
}


