import React from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'
import { CardDeck } from 'react-bootstrap'






const GameContainer = (props) => {
    return ( 
        <div>
            <Search  clickHandler={props.searchGame}/>
            <br/>
            <CardDeck>
            {props.games.map(game => 
                <Game 
                key={game.id}
                game={game}
                addGame={props.addGame}
            
                />
                )}
            </CardDeck>
               

           
        </div>
     );
}
 
export default GameContainer;