import { AppBar,Toolbar, styled } from "@mui/material";
// The App Bar displays information and actions relating to the current screen. The top App bar provides content and actions related to the current screen. It's used for branding, screen titles, navigation, and actions.It can transform into a contextual action bar or be used as a navbar.
import {Link} from 'react-router-dom';


const Component=styled(AppBar)`
    background:#FFFFFF;
    color:#000;
`
const Container=styled(Toolbar)`
justify-content:center;
    & > a{
        padding:50px;
        color:#000;
        text-decoration:none;
    }
`


const Header=()=>{
    return (
        <Component>
            <Container>
                <Link to='/'>Home</Link>
                <Link to='/about'> About</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>Logout</Link>
            </Container>
        </Component>
    )
}

export default Header;