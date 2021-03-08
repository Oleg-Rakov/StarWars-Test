import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './CardsOfPlanet.module.css';
import Preloader from '../Common/Preloader';
import PlanetPreview from './PlanetPreview';


class CardsOfPlanets extends React.Component {
    state = {
        planets: [],
        isLoad: false,
        isHaveMorePlanets: true
    }

    getMorePlanetFetch() {
        this.setState({
            isLoad: true
        })
        fetch(`https://swapi.dev/api/planets/?page=${this.props.currentPage + 1}`)
            .then(res => res.json())
            .then((response) => {
                if (Array.isArray(response.results)) {
                    this.setState({
                        planets: [...this.state.planets, ...response.results],
                        isLoad: false
                    });
                    this.props.incrementCurrentPage();
                } else {
                    this.setState({
                        isHaveMorePlanets: false,
                        isLoad: false
                    })
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isLoad: false
                })
            })
    }

    componentDidMount() {
        this.getMorePlanetFetch();
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
        return (
            <div className={styles.planets}>
                {this.state.isLoad && (
                    <Preloader />
                )}
                <div className={styles.planetBlock}>
                    {this.state.planets.map(p =>
                        <PlanetPreview key={p.name} navigatePlanet={this.navigatePlanet} planetInfo={p} />
                    )}
                </div>
                <div className={styles.planetBTN}>
                    {this.state.isHaveMorePlanets ? (
                        <button onClick={this.onClickLoadMoreButton}>LOAD MORE</button>
                    ) : (
                        <div className={styles.allLoaded}>ALL PLANETS ARE LOADED</div>
                    )}
                </div>
            </div >
        )
    }
}

export default withRouter(CardsOfPlanets);