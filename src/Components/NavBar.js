import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Navbar,Nav} from 'react-bootstrap';


const StyledLinks = styled.div`

line-height: 1em;
    display: flex-end;
    text-decoration: none;
    padding: 120px;
    margin: 42px; 
    justify-content: space-between;


`

const NavBar = (props) => {
    return ( 

      
          
           

           <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/explore">GameChanger</Navbar.Brand>
    <Nav className="mr-auto">
        <StyledLinks>
            <Link to='/explore'>Explore</Link> 
           <Link to='/profile'> Profile</Link>
           <Link to='/collect'> Collect </Link>
           <Link to='/login'> Login </Link> 
        </StyledLinks>
    </Nav>
  </Navbar>

           
         
       



     );
}
 
export default NavBar;