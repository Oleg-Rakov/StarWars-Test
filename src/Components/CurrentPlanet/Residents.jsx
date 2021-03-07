import React from 'react';
import styles from './CurrentPlanet.module.css';


let Residents = ({ resInfo }) => {

    console.log(resInfo)
    return (
        // NAME HEIGHT MASS GENDER 
        <div className={styles.residentsInfoBlock}>
            {resInfo.map(x => {
                return <div className={styles.selectName}>
                    <select>
                        <option >{x.name}</option>
                        <option >{x.height}</option>
                        <option >{x.mass}</option>
                        <option >{x.gender}</option>
                    </select>
                </div>
            })}

        </div>
    )
}

export default Residents;