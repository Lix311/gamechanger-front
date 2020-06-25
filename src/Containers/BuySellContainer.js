import React from 'react';
import Game from '../Components/Game'

const BuySellContainer = (props) => {
    return ( 
        <div>
            {props.games.map(game => 
            
                <Game 
                key={game.id}
                game={game}
                buyGame={props.buyGame}
                />
            )}
        </div>
     );
}
 
export default BuySellContainer;