import React from 'react';
import styles from './CurrentPlanet.module.css';
import planetImg from '../../assets/planet-img.jpg'
import Residents from './Residents.jsx';


class CurrentPlanet extends React.Component {
    state = {
        currentPlanetInfo: [],
        residentsInfo: [],
    }

    getCurrentPlanetInfo() {
        fetch(this.props.location.state.url)
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        currentPlanetInfo: response
                    });
                },
                // error BLOCK
            )
    }

    getResidents() {
        fetch(this.props.location.state.url)
            .then(res => res.json())
            .then(response => {
                for (let i = 0; i < response.residents.length; i++) {
                    Promise.all([
                        fetch(response.residents[i])
                            .then(res => res.json())
                    ]).then(allResponse => {
                        this.setState({
                            residentsInfo: this.state.residentsInfo.concat(allResponse)
                            //residentsInfo: allResponse
                        })
                    })
                }
            })
    }

    componentDidMount() {
        this.getCurrentPlanetInfo();
        this.getResidents();
    }

    render() {
        return (
            <div className={styles.planetDetailContainer}>
                <div className={styles.planetDetailsWithImg}>
                    <img src={planetImg} alt='' />
                    <div><b>NAME</b>: {this.state.currentPlanetInfo.name}</div>
                </div>
                <div className={styles.planetDetails}>
                    <div><b>ROTATION PERIOD</b>: {this.state.currentPlanetInfo.rotation_period}</div>
                    <div><b>DIAMETER</b>: {this.state.currentPlanetInfo.diameter}</div>
                    <div><b>CLIMATE</b>: {this.state.currentPlanetInfo.climate}</div>
                    <div><b>GRAVITY</b>: {this.state.currentPlanetInfo.gravity}</div>
                    <div><b>TERRAIN</b>: {this.state.currentPlanetInfo.terrain}</div>
                    <div><b>POPULATION</b>: {this.state.currentPlanetInfo.population}</div>
                    <div><b>RESIDENTS</b>:</div>
                    <Residents resInfo={this.state.residentsInfo} />
                </div>

            </div>
        )
    }
}




export default CurrentPlanet;