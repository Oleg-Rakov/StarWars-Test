import React from 'react';
import planetImg from '../../assets/planet-img.jpg'
import styles from './CardsOfPlanet.module.css';


const PlanetPreview = ({ planetInfo, navigatePlanet }) => {
    return (
        <div onClick={() => navigatePlanet(planetInfo.url, `/planets/${planetInfo.name}`)} className={styles.planetItem}>
            <img src={planetImg} />
            <p><b>Name</b>: {planetInfo.name}</p>
            <p><b>Population</b>: {planetInfo.population}</p>
            <p><b>Climate</b>: {planetInfo.climate}</p>
        </div>
    )
}

export default PlanetPreview;