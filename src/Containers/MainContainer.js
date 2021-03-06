import React, { Component } from 'react';
import Login from '../Components/Login'
import NavBar from '../Components/NavBar'
import Search from '../Components/Search'
import GameContainer from './GameContainer';
import UserGameContainer from './UserGameContainer';
import BuySellContainer from './BuySellContainer';
import { Route, Switch } from 'react-router-dom'



class MainContainer extends Component {
    render() {
    return (  
        <div>
            <NavBar/>
           
            
            
            <Switch>
                <Route
                    exact path="/explore"
                    render={()=>
                        <GameContainer 
                            searchGame={this.props.searchGame}
                            games={this.props.games}
                            addGame={this.props.addGame}
                        />
                    }
                />

                <Route
                    exact path="/profile"
                    render={()=>
                        <UserGameContainer 
                            games={this.props.usergames}
                            sellGame={this.props.sellGame}
                        />
                    }
                />

                <Route
                    exact path="/collect"
                    render={()=>
                        <BuySellContainer 
                            games={this.props.soldgames}
                            buyGame={this.props.buyGame}
                        />
                    }
                />

                <Route
                    exact path="/login"
                    render={()=>
                        <Login
                            login={this.props.login}
                            games={this.props.games}
                        />
                    }
                />
                
            </Switch>
        </div>
    );
}
}
 
export default MainContainer;