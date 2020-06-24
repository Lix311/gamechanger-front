import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'

const gameUrl = 'https://rawg.io/api/games?page=1&page_size=5'

class App extends Component {
  
  state = {  
    games:[]
  }

  componentDidMount(){
    fetch(gameUrl)
    .then(res => res.json())
    .then(data => this.setState({games: data}))
  }
  
  render() { 
    if (this.state.games.results === undefined) {
      return <div>Loading...</div>
    }

    return (  
      <div>
        <MainContainer games={this.state.games.results}/>
      </div>
    );
  }
}
 
export default App;

