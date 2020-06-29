import React from 'react';
import styled from 'styled-components'
import '../NavBar.css'
import { Link } from 'react-router-dom'
import { Navbar as BootstrapNav,Nav} from 'react-bootstrap';


 const StyledLinks = styled.div`

line-height: 1em;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    width: 400px;

`
const StyledNavBar = styled(BootstrapNav)`
    display: flex;
    justify-content: space-between;
    width: 100vw;
    margin: 0;

`
const NavBar = (props) => {
    return ( 

      
          
           

<StyledNavBar className='parentbar' bg="dark" variant="dark">
    <BootstrapNav.Brand href="/explore">GameChanger</BootstrapNav.Brand>
        {/* <Nav className="mr-auto"> */}
            <StyledLinks>
            <Link to='/explore'>Explore</Link> 
            <Link to='/profile'> Profile</Link>
            <Link to='/collect'> Collect </Link>
            <Link to='/login'> Login </Link> 
            </StyledLinks>
        {/* </Nav> */}
</StyledNavBar>

           
         
       



     );
}
 
export default NavBar;