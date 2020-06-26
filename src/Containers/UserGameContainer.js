import React, { Component } from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'

class UserGameContainer extends Component {
    state = {  
        filteredGames: this.props.games
    }

    filterGames = (searchTerm) => {
        const filteredGames = this.props.games.filter(game => game.name === searchTerm)
        this.setState({filteredGames: filteredGames})
    }
    
    
    render() { 
        
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


