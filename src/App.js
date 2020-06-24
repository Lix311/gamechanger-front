import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'

const gameUrl = 'https://api.rawg.io/api/games?dates=2020-04-01,2020-06-30&ordering=-added&page=1&page_size=10'

class App extends Component {
  
  state = {  
    games: [],
    usergames: []
  }

  componentDidMount(){
    fetch(gameUrl)
    .then(res => res.json())
    .then(data => this.setState({games: data}))
  }
  
  addGameHandler = (game) => {
    this.setState({usergames: [...this.state.usergames, game]})
  }

  sellGameHandler = (game) => {
    const newgames = this.state.usergames.filter(usergame => usergame.name !== game.name)
    this.setState({usergames: newgames})
  }
  
  
  
  
  render() { 

    if (this.state.games.results === undefined) {
      return <div>Loading...</div>
    }

    console.log('app',)

    return (  
      <div>
        <MainContainer 
          games={this.state.games.results}
          usergames={this.state.usergames}
          addGame={this.addGameHandler}
          sellGame={this.sellGameHandler}
        />
      </div>
    );
  }
}
 
export default App;

