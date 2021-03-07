import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './CardsOfPlanet.module.css';
import planetImg from '../../assets/planet-img.jpg'
import Preloader from '../Common/Preloader';




class CardsOfPlanets extends React.Component {
    state = {
        planets: [],
        isLoad: false
    }

    getPlanetFetch() {
        fetch(`https://swapi.dev/api/planets/?page=${this.props.currentPage + 1}`)
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        planets: response.results,
                        isLoad: true
                    });
                    this.props.incrementCurrentPage();

                },
                // error BLOCK
            )
    }

    getMorePlanetFetch() {
        fetch(`https://swapi.dev/api/planets/?page=${this.props.currentPage + 1}`)
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        planets: [...this.state.planets, ...response.results],
                    });
                    this.props.incrementCurrentPage();
                },
                // error BLOCK
            )
    }

    componentDidMount() {
        this.getPlanetFetch();
    }

    navigatePlanet = (url, route) => {
        this.props.history.push({
            pathname: route,
            state: { url }
        })
    }

    onClickLoadMoreButton = () => {
        this.getMorePlanetFetch();
    }

    render() {
        if (!this.state.isLoad) return <Preloader />
        return (
            <div className={styles.planets}>
                <div className={styles.planetBlock}>
                    {this.state.planets.map(p =>
                        <div onClick={() => this.navigatePlanet(p.url, `/planets/${p.name}`)} className={styles.planetItem}>
                            <img src={planetImg} />
                            <p><b>Name</b>: {p.name}</p>
                            <p><b>Population</b>: {p.population}</p>
                            <p><b>Climate</b>: {p.climate}</p>
                        </div>
                    )}
                </div>
                <div className={styles.planetBTN}>
                    <button onClick={this.onClickLoadMoreButton}>LOAD MORE</button>
                </div>
            </div >
        )
    }
}

// let WithUrlData = withRouter(CardsOfPlanets)

export default withRouter(CardsOfPlanets);