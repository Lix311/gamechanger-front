import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const gameUrl = 'https://api.rawg.io/api/games?dates=2020-04-01,2020-06-30&ordering=-added&page=1&page_size=10'
const userUrl = 'http://localhost:3001/users'
const userGamesUrl = 'http://localhost:3001/usergames'
const allGames = 'http://localhost:3001/games'

class App extends Component {
  
  //beyond mvp

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
    loggedIn: false, 
    deletedGames: []
    


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
    .then(data => {
      this.setState({allGames: data})
      const allSold = this.state.allGames.filter(allgame => allgame.sold === true)
      this.setState({soldgames: allSold})
    }) // populating allGames and soldGames
    fetch(userGamesUrl)
    .then(res => res.json())
    .then(data => this.setState({usergames: data}))

    

    

    
  }

  deleteGameHandler = (game) => {
    console.log('deleting...')

   const filteredUserGames = this.state.userCurrentGames.filter(filteredGame => filteredGame != game)
   const notDeletedUserGames = this.state.soldgames.filter(soldGame => soldGame != game)
   this.setState({userCurrentGames: filteredUserGames})
    this.setState({soldgames: notDeletedUserGames})
    this.setState({deletedGames: [...this.state.deletedGames, game]})

    // go thro allgame and change the games status sold to false 
    
    
    fetch(`http://localhost:3001/games/${game.id}`, {
      method:'DELETE',
      headers: {"Content-Type": "application/json"}
    })
  }


  

  
  addGameHandler = (game,condition) => {
    //this.setState({allGames: [...this.state.allGames, game]})
    if (condition === 'Select Condition'){return}
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
      metascore: game.metacritic,
      condition: condition,
      loose_price: 30,
      cib_price: 60,
      new_price: 100,
      sold: false
    })})
    .then(res => res.json())
    .then(data => this.setState({currentGame: data}, () => {
      
      this.setState({userCurrentGames: [...this.state.userCurrentGames, this.state.currentGame]})
      this.setState({allGames: [...this.state.allGames, this.state.currentGame]})

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
    .then(data => this.setState({usergames: [...this.state.usergames, data]}))
    
      
    //console.log("state after game added", this.state);
    }))

    // take condition and based on condition add price to game 
    // game.condition = condition;
    // game.loose_price = '30'
    // game.new_price = '100'
    // game.cib_price = '60' 
    // changed this to fix duplicate bug 

    console.log(this.state.userCurrentGames)
    
    // this.setState({userCurrentGames: [...this.state.userCurrentGames, game]})

  }

  updateUserCurrentGames = (game,gameCondition) => {
    console.log(game.id,gameCondition)
    
    // need to make a patch to backend 
    let target = this.state.userCurrentGames.find(currentgame => currentgame.id === game.id)
    
    if (target === undefined) {
      return  
    }

    
    fetch(`http://localhost:3001/games/${game.id}`, {
      method:'PATCH',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({condition: gameCondition})
    })
    .then(res => res.json())
    .then(data => {
      let target = this.state.userCurrentGames.find(currentgame => currentgame.id === game.id)
      let index = this.state.userCurrentGames.indexOf(target)
      let updatedGames = [...this.state.userCurrentGames]
  
      updatedGames[index].condition = gameCondition
      this.setState({userCurrentGames: updatedGames})


    })

    
    // let index = this.state.userCurrentGames.indexOf(target)
    // let updatedGames = [...this.state.userCurrentGames]

    // updatedGames[index].condition = condition
    // this.setState({userCurrentGames: updatedGames})
    
    
    
  }

  buyGameHandler = (game) => {
    //search thro usergames and find who the game id belongs to 
    
    
    // this.setState({payReminder: [...this.state.payReminder, currentReminder]})

  }

  sellGameHandler = (soldgame) => {
    // const soldgame = this.state.usergames.filter(usergame => usergame.name === game.name)
    // this.setState({soldgames: [...this.state.soldgames, ...soldgame]})
    console.log(`selling ${soldgame.title}`)
    // patch the sold so it is !false and then filter thro this.state.games and put all sold into sold array

    fetch(`http://localhost:3001/games/${soldgame.id}`, {
      method:'PATCH',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({sold: true})
    })
    .then(res => res.json())
    .then(data => {
      let target = this.state.allGames.find(game => game.id === soldgame.id)
      let index = this.state.allGames.indexOf(target)
      let updatedGames = [...this.state.allGames]
  
      updatedGames[index].sold = true
      this.setState({allGames: updatedGames})
      
      const allSold = this.state.allGames.filter(allgame => allgame.sold === true)
      
      const filtered = allSold.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        this.state.deletedGames
    );

    console.log(filtered)
      

      this.setState({soldgames: filtered})


    })
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

    // const allSold = this.state.allGames.filter(allgame => allgame.sold === true)
    // this.setState({soldgames: allSold})
  
    return (  
      <div>
        <MainContainer 
          login={this.loginHandler}
          games={this.state.games.results}
          usergames={this.state.usergames}
          users={this.state.userInfo}
          soldgames={this.state.soldgames}
          addGame={this.addGameHandler}
          sellGame={this.sellGameHandler}
          buyGame={this.buyGameHandler}
          searchGame={this.searchGameHandler}
          searchUserGame={this.searchUserGame}
          userCurrentGames={this.state.userCurrentGames}
          updateGames={this.updateUserCurrentGames}
          deleteGame={this.deleteGameHandler}
          allgames={this.state.allGames}
          

        />
      </div>
    );
  }
}
 
export default App;

