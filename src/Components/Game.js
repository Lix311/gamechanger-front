import React from 'react';
import { Card } from 'react-bootstrap';



const Game = (props) => {

    return ( 
  <Card>
    <Card.Img variant="top" src={props.game.background_image} />
    <Card.Body>
    <Card.Title>{props.game.name}</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
      <button onClick={() => 
                props.buyGame
                ? props.buyGame(props.game)
                : props.addGame ? props.addGame(props.game) : props.sellGame(props.game)}>{
                
                props.buyGame ? 'Buy Game' : props.addGame ? 'Add Game' : 'Sell Game'}
        </button>
    </Card.Body>
    <Card.Footer>
    <small>{props.game.platforms.map(platform => platform.platform.name + ' ')}</small>
    </Card.Footer>
  </Card>





     );
}
 
export default Game;