import React from 'react';
import Login from '../Components/Login'
import NavBar from '../Components/NavBar'
import Search from '../Components/Search'
import GameContainer from './GameContainer';
import UserGameContainer from './UserGameContainer';
import BuySellContainer from './BuySellContainer';



const MainContainer = (props) => {
    return (  
        <div>
            <NavBar/>
            <Search/>
            <GameContainer games={props.games}/>
            <UserGameContainer />
            <BuySellContainer />
            <Login />
        </div>
    );
}
 
export default MainContainer;