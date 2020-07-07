import React, { Component } from 'react';
import { Card, CardGroup, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import styled from 'styled-components'


const StyledCard = styled.div`
    background-color: grey;
    height: 100%;
    width: 400px;
    padding: 8px;
    margin: 8px;

`

class Game extends Component {
  state = {  
    description: '',
    toggled: false,
    conditionType: 'Select Condition',
    sold: false
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

changeCondition = (event) => {
console.log(event)
  this.setState({conditionType: event})
  this.props.updateGames(this.props.game, event)

}

 giveEmails = () => {
  
 if (this.props.usergames === undefined){return}
  
  //   console.log(this.props.game.id)
  //   console.log(this.props.allgames)
  //   console.log(this.props.users)
  // console.log(this.props.usergames)

    const filteredUserGames = this.props.usergames.find(allgame => allgame.game_id === this.props.game.id)
    console.log(filteredUserGames)
    const filteredUserId = filteredUserGames.user_id
    
    return this.props.users.find(user => user.id === filteredUserId).email 
  
  
 }

 openEmail = (address) => {
  window.open(`mailto:${address}`);
  
 }


  
  
  render() { 
    // id logic here? 
   
   
    
    return ( 

      

      <StyledCard>
    <Card.Img variant="top" src={this.props.game.background_image ? this.props.game.background_image : this.props.game.image } />
    <Card.Body>
    <Card.Title><h4>{this.props.game.name ? this.props.game.name : this.props.game.title}</h4></Card.Title>
    <Card.Text>{this.state.toggled ? this.state.description : ''}</Card.Text>
    <Button variant="light" onClick={this.getDescription}>{this.state.toggled ? 'Hide Description' : 'Show Description'}</Button>{' '}
     
    <Dropdown>
  <DropdownButton id='dropdown-basic-button' title={this.props.game.condition ? this.props.game.condition : this.state.conditionType}  >
    <Dropdown.Item as="button"><div onClick={(e) => this.changeCondition(e.target.textContent)}>Loose</div></Dropdown.Item>
    <Dropdown.Item as="button"><div onClick={(e) => this.changeCondition(e.target.textContent)}>Complete</div></Dropdown.Item>
    <Dropdown.Item as="button"><div onClick={(e) => this.changeCondition(e.target.textContent)}>New</div></Dropdown.Item>
  {/* this is being set to Select Condition */}
  </DropdownButton>
  </Dropdown>
  <br/>
  

        {this.props.addGame ? <button onClick={() => this.props.addGame(this.props.game,this.state.conditionType)}>Add Game</button> : ''}
        {this.props.deleteGame ? <button onClick={() => this.props.deleteGame(this.props.game)}>Delete Game</button> : ''}
        {this.props.sellGame && !this.props.game.sold ? <button onClick={() => this.props.sellGame(this.props.game)}>Sell Game</button> : ''}
        {this.props.buyGame ? <button onClick={() => this.openEmail(this.giveEmails())}> Contact Seller</button> : ''}

        
        {/* put email on game that you sell, and in profile have a paid button on Game*/}
        
        
        
        
      <br/>
       {this.props.game.sold ? <small>FOR SALE: {this.giveEmails()} </small> : ""}
     

       
        

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



  
  
  


  





    
 
