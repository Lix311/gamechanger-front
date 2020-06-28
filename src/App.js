import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const gameUrl = 'https://api.rawg.io/api/games?dates=2020-04-01,2020-06-30&ordering=-added&page=1&page_size=10'
const searchGameUrl = 'https://api.rawg.io/api/games/'
const userUrl = 'http://localhost:3001/users'

class App extends Component {
  
  state = {  
    allGames: [], // everythin i searched
    games: [],
    usergames: [],
    soldgames: [],
    userInfo: [],
    currentUser: '',
    loggedIn: false


  }

  componentDidMount(){
    fetch(gameUrl)
    .then(res => res.json())
    .then(data => this.setState({games: data})) // Fill Explore Page w/Games
    fetch(gameUrl) // Fill state w/All Games
    .then(res => res.json())
    .then(data => this.setState({allGames: [...this.state.allGames, data]}))
    fetch(userUrl) // Fill state w/All User Info
    .then(res => res.json())
    .then(data => this.setState({userInfo: data.data}))

    
  }
  
  addGameHandler = (game) => {
    const currentUserId = this.state.currentUser.id
    const gameId = game.id 
    let newGame = {
      id: gameId,
      type: 'games'
    }

    fetch(`http://localhost:3001/users${currentUserId}`,{
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(newGame)
    })

    //try to make a POST to users/1

    this.setState({usergames: [...this.state.usergames, game.id]})

  }

  buyGameHandler = (game) => {
    const boughtgame = this.state.soldgames.filter(soldgame => soldgame.name === game.name)
    const currentgames = this.state.soldgames.filter(soldgame => soldgame.name !== game.name)
    this.setState({usergames: [...this.state.usergames, ...boughtgame]})
    this.setState({soldgames: currentgames})

  }

  sellGameHandler = (game) => {
    const soldgame = this.state.usergames.filter(usergame => usergame.name === game.name)
    // const currentgames = this.state.usergames.filter(usergame => usergame.name !== game.name)
    // *Dont delete game from profile until its actually sold*
    // this.setState({usergames: currentgames})
    this.setState({soldgames: [...this.state.soldgames, ...soldgame]})
  }

  searchGameHandler = (string) => {
    fetch(`https://api.rawg.io/api/games?page_size=5&search=${string}`)
    .then(res => res.json())
    .then(data => this.setState({games: data}))
    // try to add to all games
    fetch(`https://api.rawg.io/api/games?page_size=5&search=${string}`)
    .then(res => res.json())
    .then(data => this.setState({allGames: [...this.state.allGames, data]}))

  }

  loginHandler = (loginName, loginPassword) => {
    const matchingUser = this.state.userInfo.find(user => user.attributes.username === loginName)

    
    if (matchingUser.attributes.password === loginPassword){
      this.setState({loggedIn: !this.state.loggedIn})
      this.setState({currentUser: matchingUser})
      //set the users games
      this.setState({usergames: [matchingUser.relationships.games.data[0].id]})
    }
  }

  
  
render() { 
    if (this.state.games.results === undefined) {
      return <div>Loading...</div>
    }
    return (  
      <div>
        <MainContainer 
          login={this.loginHandler}
          games={this.state.games.results}
          usergames={this.state.usergames}
          soldgames={this.state.soldgames}
          addGame={this.addGameHandler}
          sellGame={this.sellGameHandler}
          buyGame={this.buyGameHandler}
          searchGame={this.searchGameHandler}
          searchUserGame={this.searchUserGame}
        />
      </div>
    );
  }
}
 
export default App;

