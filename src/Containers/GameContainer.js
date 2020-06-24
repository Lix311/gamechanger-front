import React from 'react';
import Game from '../Components/Game'

const GameContainer = (props) => {
    return ( 
        <div>
            {props.games.map(game => 
                <Game 
                key={game.id}
                {...game}
                />
            )}
        </div>
     );
}
 
export default GameContainer;