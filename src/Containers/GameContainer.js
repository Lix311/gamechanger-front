
import Game from '../Components/Game'
import Search from '../Components/Search'
import { CardDeck } from 'react-bootstrap'
import React, { Component } from 'react';

class GameContainer extends Component {
    state = {
        term:''
      }
    
      handleChange = (event) => {
       this.setState({term: event.target.value})
      }
    
    
      render() { 
        return ( 
            <div>
                <Search  clickHandler={this.props.searchGame}  placeholder='Search Game' term={this.state.term} handleChange={this.handleChange} />
                <br/>
                <CardDeck>
                {this.props.games.map(game => 
                    <Game 
                    updateGames={this.props.updateGames}
                    key={game.id}
                    game={game}
                    addGame={this.props.addGame}
                
                    />
                    )}
                </CardDeck>
                   
    
               
            </div>
         );
    }
}
 
export default GameContainer;





 

    