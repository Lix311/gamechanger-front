import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'




const StyledBar = styled.div`

    background-color lightblue;
    display: flex;
    height: 60px;
    margin-top: 10px;
    justify-content: space-evenly
`




const NavBar = (props) => {
    return ( 

       <StyledBar>
          
           <Link to='/explore'> <h1>Explore</h1> </Link> 
           <Link to='/profile'> <h1>Profile</h1> </Link>
           <Link to='/collect'> <h1>Collect</h1> </Link>
           <Link to='/login'> <h1>Login</h1> </Link>
         
        </StyledBar>



     );
}
 
export default NavBar;