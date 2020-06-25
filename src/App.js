import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'

const gameUrl = 'https://api.rawg.io/api/games?dates=2020-04-01,2020-06-30&ordering=-added&page=1&page_size=10'
const searchGameUrl = 'https://api.rawg.io/api/games/'

class App extends Component {
  
  state = {  
    games: [],
    usergames: [],
    soldgames: []
  }

  componentDidMount(){
    fetch(gameUrl)
    .then(res => res.json())
    .then(data => this.setState({games: data}))
  }
  
  addGameHandler = (game) => {
    this.setState({usergames: [...this.state.usergames, game]})
  }

  buyGameHandler = (game) => {
    const boughtgame = this.state.soldgames.filter(soldgame => soldgame.name === game.name)
    const currentgames = this.state.soldgames.filter(soldgame => soldgame.name !== game.name)
    this.setState({usergames: [...this.state.usergames, ...boughtgame]})
    this.setState({soldgames: currentgames})

  }

  sellGameHandler = (game) => {
    const soldgame = this.state.usergames.filter(usergame => usergame.name === game.name)
    const currentgames = this.state.usergames.filter(usergame => usergame.name !== game.name)
    
    this.setState({usergames: currentgames})
    this.setState({soldgames: [...this.state.soldgames, ...soldgame]})
  }

  searchGameHandler = (string) => {
    fetch(`https://api.rawg.io/api/games?page_size=5&search=${string}`)
    .then(res => res.json())
    .then(data => this.setState({games: data}))
  }
  
  
  
  
  render() { 
    console.log(this.state.games)
    if (this.state.games.results === undefined) {
      return <div>Loading...</div>
    }

    return (  
      <div>
        <MainContainer 
          games={this.state.games.results}
          usergames={this.state.usergames}
          soldgames={this.state.soldgames}
          addGame={this.addGameHandler}
          sellGame={this.sellGameHandler}
          buyGame={this.buyGameHandler}
          searchGame={this.searchGameHandler}
        />
      </div>
    );
  }
}
 
export default App;

