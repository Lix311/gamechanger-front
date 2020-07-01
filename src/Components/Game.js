import React, { Component } from 'react';
import { Card, CardGroup, button } from 'react-bootstrap';
import styled from 'styled-components'


const StyledCard = styled.div`
    background-color: grey;
    height: 100%;
    width: 400px;

`

class Game extends Component {
  state = {  
    description: '',
    toggled: false
  }
  
  getDescription = () => {
    if (this.props.game.slug){
      fetch(`https://api.rawg.io/api/games/${this.props.game.slug}`)
      .then(res => res.json())
      .then(data => this.extractContent(data.description))

      this.setState({toggled: !this.state.toggled})
    
    } else if (this.props.game.results.slug){
      fetch(`https://api.rawg.io/api/games/${this.props.game.results.slug}`)
      .then(res => res.json())
      .then(data => this.extractContent(data.description))

      this.setState({toggled: !this.state.toggled})
    }
}

extractContent = (s) => {
  const span = document.createElement('span');
  span.innerHTML = s;
  this.setState({description: span.textContent || span.innerText})
}
  
  
  render() { 
    return ( 

      <StyledCard>
    <Card.Img variant="top" src={this.props.game.background_image ? this.props.game.background_image : this.props.game.image } />
    <Card.Body>
    <Card.Title>{this.props.game.name ? this.props.game.name : this.props.game.title}</Card.Title>
    <Card.Text>{this.state.toggled ? this.state.description : ''}</Card.Text>
    <button onClick={this.getDescription}>{this.state.toggled ? 'Hide Description' : 'Show Description'}</button>
      <button onClick={() => 
                this.props.buyGame
                ? this.props.buyGame(this.props.game)
                : this.props.addGame ? this.props.addGame(this.props.game) : this.props.sellGame(this.props.game)}>{
                
                this.props.buyGame ? 'Buy Game' : this.props.addGame ? 'Add Game' : 'Sell Game'}
        </button>
    </Card.Body>
    <Card.Footer>
    <small>
      {this.props.game.platforms ? this.props.game.platforms.map(platform => platform.platform.name + ' ') : this.props.game.platform}
    </small>
    </Card.Footer>
  </StyledCard>
     
     );
  }
}
 
export default Game;



  
  
  


  





    
 
