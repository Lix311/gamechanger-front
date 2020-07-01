import React, { Component } from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'
import { CardDeck } from 'react-bootstrap'

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
            <CardDeck>
             {this.state.filteredGames.map(game => 
                <Game 
                key={game.id}
                game={game}
                sellGame={this.props.sellGame}
                />
            )}
            </CardDeck>
            </div>
        );
    }
}
 
export default UserGameContainer;


