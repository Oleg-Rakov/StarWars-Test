import React from 'react';
import styles from './CurrentPlanet.module.css';
import Resident from './Resident';






let Residents = ({ resInfo, isResidentsLoading }) => {

    if (isResidentsLoading) {
        return (
            <div style={{ color: 'red' }}>
                RESIDENTS ARE LOADING
            </div>
        )
    }
    return (
        <div className={styles.residentsInfoBlock}>
            {  resInfo.length === 0 ? (
                <div>NO RESIDENTS ON THIS PLANET</div>
            ) : (
                resInfo.map(residentInfo => {
                    return <Resident key={residentInfo.name} residentInfo={residentInfo} />
                })
            )}
        </div>
    )
}

export default Residents;