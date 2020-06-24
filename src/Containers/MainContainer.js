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
        console.log('main containert',this.props)
    return (  
        <div>
            <NavBar/>
            <Search/>
            
            <Switch>
                <Route
                    exact path="/explore"
                    render={()=>
                        <GameContainer 
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
                            games={this.props.games}
                        />
                    }
                />

                <Route
                    exact path="/login"
                    render={()=>
                        <Login
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