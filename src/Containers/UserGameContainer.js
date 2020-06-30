import React, { Component } from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'

class UserGameContainer extends Component {
    state = {  
        filteredGames: this.props.currentgames
    }

    filterGames = (searchTerm) => {
        const filteredGames = this.props.currentgames.filter(game => game.title === searchTerm)
        this.setState({filteredGames: filteredGames})
    }
    
    
    render() { 
       console.log(this.props)
        return (  
            <div>
                
            <Search clickHandler={this.filterGames}/>
             {this.state.filteredGames.map(game => 
                <Game 
                key={game.id}
                game={game}
                sellGame={this.props.sellGame}
                />
            )}
        
            </div>
        );
    }
}
 
export default UserGameContainer;


