import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const gameUrl = 'https://api.rawg.io/api/games?dates=2020-04-01,2020-06-30&ordering=-added&page=1&page_size=10'
const userUrl = 'http://localhost:3001/users'

class App extends Component {
  
  state = {  
    allGames: [], // everythin i searched
    games: [],
    usergames: [],
    soldgames: [],
    userInfo: [],
    currentUser: '',
    currentGame: '',
    loggedIn: false


  }

  componentDidMount(){
    fetch(gameUrl)
    .then(res => res.json())
    .then(data => this.setState({games: data})) // Fill Explore Page w/Games
    fetch(userUrl) // Fill state w/All User Info
    .then(res => res.json())
    .then(data => this.setState({userInfo: data}))

    

    
  }

  
  addGameHandler = (game) => {
    
    this.setState({allGames: [...this.state.allGames, game]})
    
    const platforms = game.platforms.map(platform => platform.platform.name)
    const genres = game.genres.map(genre => genre.name)
    
    fetch(`http://localhost:3001/games`,{
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify({
      slug: game.slug, 
      title: game.name, 
      platform: platforms.join(', '), 
      genre: genres.join(', '), 
      release_date: game.released, 
      metascore: game.metacritic
    })})
    .then(res => res.json())
    .then(data => this.setState({currentGame: data}))

    // ABOVE POPULATES localhost:3001/games

    // BELOW POPULATES localhost:3001/usergames
    
    // how do I find game_id on line 75
    
    // const currentUser = this.state.userInfo.find(user => user.username === this.state.currentUser.username)// find id of current user 
    // const currentGame = this.state.allGames[this.state.allGames.length-1]
    
    
    // fetch(`http://localhost:3001/usergames`,{
    // method: "POST", 
    // headers: {"Content-Type": "application/json"},
    // body:JSON.stringify({
    //   api_id: game.slug,
    //   user_id: currentUser.id,
    //   game_id: currentGame.id
    // })
    // })
    // .then(res => res.json())
    // .then(json => console.log(json))

    


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
    
    const matchingUser = this.state.userInfo.find(user => user.username === loginName)
    
    
     if (matchingUser.password === loginPassword){
       this.setState({loggedIn: !this.state.loggedIn})
       this.setState({currentUser: matchingUser})
       
      
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

