import { Navbar, Container } from 'react-bootstrap';

const MenuBar = (params) => {
    console.log(params.id, params.invalidID)
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/logo512.png" width="30" height="30" className="d-inline-block align-center" alt="Morningbell logo">
                    </img>{' '}
                    Morningbell</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                {!params.invalidID && <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Room Code: {params.id}
                    </Navbar.Text>
                </Navbar.Collapse>}
                {/* <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    )
}

export default MenuBar;