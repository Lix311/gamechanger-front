import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const gameUrl = 'https://api.rawg.io/api/games?dates=2020-04-01,2020-06-30&ordering=-added&page=1&page_size=10'
const userUrl = 'http://localhost:3001/users'
const userGamesUrl = 'http://localhost:3001/usergames'
const allGames = 'http://localhost:3001/games'

class App extends Component {
  
  state = {  
    allGames: [], // everythin i searched
    games: [],
    usergames: [],
    soldgames: [],
    userInfo: [],
    currentUser: '',
    currentGame: '',
    userCurrentGames: [],
    currentGameIds: [],
    loggedIn: false


  }

  componentDidMount(){
    fetch(gameUrl)
    .then(res => res.json())
    .then(data => this.setState({games: data})) // Fill Explore Page w/Games
    fetch(userUrl) // Fill state w/All User Info
    .then(res => res.json())
    .then(data => this.setState({userInfo: data}))
    fetch(allGames)
    .then(res => res.json())
    .then(data => this.setState({allGames: data})) // Fill allGames with games database
    fetch(userGamesUrl)
    .then(res => res.json())
    .then(data => this.setState({usergames: data}))

    
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
      image: game.background_image, 
      title: game.name, 
      platform: platforms.join(', '), 
      genre: genres.join(', '), 
      release_date: game.released, 
      metascore: game.metacritic
    })})
    .then(res => res.json())
    .then(data => this.setState({currentGame: data}, () => {
      
      
    fetch(`http://localhost:3001/usergames`,{
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify({
      api_id: game.slug,
      user_id: this.state.currentUser.id,
      game_id: this.state.currentGame.id
    })
    })
    .then(res => res.json())
    .then(json => console.log(json))
      
    console.log("state after game added", this.state);
    }))
    
    // this.setState({usergames: [...this.state.usergames, game]})

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
       
       this.setState({currentUser: matchingUser}, () => {
        
        const currentUserId = this.state.currentUser.id
        const usergames = this.state.usergames
        
        const currentUserGames = usergames.filter(game => game.user_id === currentUserId) // finds usergames of the current User
        const currentGameIds = currentUserGames.map(game => game.game_id)
        
        this.setState({currentGameIds: currentGameIds }, () => {
          const filteredResults = this.state.allGames.filter(game => this.state.currentGameIds.includes(game.id))
          this.setState({userCurrentGames: filteredResults})
              // console.log(this.state.allGames)
              // console.log(this.state.currentGameIds)
              // console.log(filteredResults)
            })
         // sets game ids for current user

      })
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
          currentGames={this.userCurrentGames}
        />
      </div>
    );
  }
}
 
export default App;

