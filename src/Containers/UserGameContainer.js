import React from 'react';
import Game from '../Components/Game'

const UserGameContainer = (props) => {
    console.log(props.games)
    return ( 
        <div>
             {props.games.map(game => 
                <Game 
                key={game.id}
                game={game}
                sellGame={props.sellGame}
                />
            )}
        </div>
     );
}
 
export default UserGameContainer;