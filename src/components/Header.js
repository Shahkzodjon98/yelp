import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "../css/App.css";


export default function YelpNavbar({signOut}){
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Container >
            <Navbar.Brand fixed="bottom" style={{color: ''}}>New Restaurant</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                 <br></br>
                <form class="d-flex" role="search">
                 <input class="form-control me-2"type="search" autocomplete="off" spellcheck="false" role="combobox" placeholder="Введите поисковый запрос или URL" aria-live="polite"></input>
                 <button class="btn btn-Info" type="submit">Search</button>
                  </form>
                <br></br>
                <Button className="signout" onClick={signOut}>Sign Out</Button><br></br>
                 {/* <a href="/signup?return_url=https://www.yelp.com/" class="hide-below-b__09f24__vjFMq css-4ut3yi" data-activated="false" data-button="true"><span class="css-1enow5j" data-font-weight="semibold">Sign Up</span></a>  */}
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
