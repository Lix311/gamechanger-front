import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`

    background-color lightblue;
    display: flex;
    height: 60px;
    margin-top: 10px;
    word-spacing: 30px;
`

const NavBar = (props) => {
    return ( 
       
       <StyledDiv>
            <h1>Explore</h1>
            <h1>Profile</h1>
            <h1>Collect</h1>
            <h1>Login</h1>
        </StyledDiv>


     );
}
 
export default NavBar;