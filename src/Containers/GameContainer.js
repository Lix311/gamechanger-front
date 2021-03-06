import React from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'

const GameContainer = (props) => {
    return ( 
        <div>
            <Search  clickHandler={props.searchGame}/>
           
            {props.games.map(game => 
                <Game 
                key={game.id}
                game={game}
                addGame={props.addGame}

                />
            )}
        </div>
     );
}
 
export default GameContainer;