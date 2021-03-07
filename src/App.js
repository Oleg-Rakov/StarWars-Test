import React from 'react';
import { Route } from 'react-router';
import './App.css';
import CardsOfPlanets from './Components/CardsOfPlanet/CardsOfPlanet';
import CurrentPlanet from './Components/CurrentPlanet/CurrentPlanet';
import Header from './Components/Header/Header';

class App extends React.Component {

  state = {
    currentPage: 0
  }

  incrementCurrentPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }

  render() {
    return (
      <div className="App">
        <Header currentPage={this.state.currentPage} />
        <Route exact={true} path='/' render={() => <CardsOfPlanets currentPage={this.state.currentPage} incrementCurrentPage={this.incrementCurrentPage} />} />
        <Route path='/planets/:id?' exact component={CurrentPlanet} />
      </div>
    );
  }
}

export default App;
