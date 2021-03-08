import React from 'react';
import styles from './CurrentPlanet.module.css';
import planetImg from '../../assets/planet-img.jpg'
import Residents from './Residents.jsx';
import Preloader from '../Common/Preloader';



class CurrentPlanet extends React.Component {
    state = {
        currentPlanetInfo: [],
        residentsInfo: [],
        isLoad: false,
        isResidentsLoading: false
    }

    componentDidMount() {
        this.getCurrentPlanetInfo();
    }

    getCurrentPlanetInfo = () => {
        this.setState({
            isLoad: true
        })
        fetch(this.props.location.state.url)
            .then(res => res.json())
            .then((response) => {
                this.setState({
                    currentPlanetInfo: response,
                    isLoad: false
                });
                this.getResidents(response.residents)
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isLoad: false
                })
            })
    }

    getResidents = (residents) => {
        this.setState({
            isResidentsLoading: true
        })
        Promise.all(residents.map(resident => fetch(resident)))
            .then(residentsArray => { // residentsArray = массив промисов
                return Promise.all(residentsArray.map(res => res.json()))
            })
            .then(residentsArrayJson => {
                this.setState({
                    residentsInfo: residentsArrayJson,
                    isResidentsLoading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isResidentsLoading: false
                })
            })

    }



    render() {
        return (
            <div className={styles.planetDetailContainer}>
                {this.state.isLoad && <Preloader />}
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
                    <Residents isResidentsLoading={this.state.isResidentsLoading} resInfo={this.state.residentsInfo} />
                </div>

            </div>
        )
    }
}




export default CurrentPlanet;