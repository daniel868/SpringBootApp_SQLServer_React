import React, {Component} from 'react';
import {Button, Container, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";

class NavBar extends Component {

    constructor(props) {
        super(props);

        console.log(this.props.userDetail)
    }


    render() {
        return (
            <div>
                <Navbar variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/home">Airport Management System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">Home</Nav.Link>

                                {this.props.userDetail === 'admin' ?
                                    <NavDropdown title="Flights" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/add-new-flight"
                                                          onClick={this.onClickAddNewFlight}>Add New
                                            Flight</NavDropdown.Item>
                                        <NavDropdown.Item href="/add-new-aircraft">Add New Aircraft</NavDropdown.Item>
                                    </NavDropdown> : null}
                                {this.props.userDetail === 'admin' ?
                                    <NavDropdown title="Travel Agency" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/add-new-employee">Add New Employee</NavDropdown.Item>
                                        <NavDropdown.Item href="/add-new-company">Add New Company</NavDropdown.Item>
                                    </NavDropdown> : null}
                                {this.props.userDetail === 'admin' ?
                                    <NavDropdown title="Clients" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/add-new-client">Add New Client</NavDropdown.Item>
                                    </NavDropdown> : null}
                                {this.props.userDetail === 'admin' ?
                                    <NavDropdown title="Users" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/add-new-user">Add New User</NavDropdown.Item>
                                    </NavDropdown> : null}
                            </Nav>
                        </Navbar.Collapse>
                        <h5 style={{color: '#ffffff', marginTop: "5px", marginRight: '10px'}}>Login as
                            : {this.props.userDetail}</h5>
                    </Container>
                </Navbar>

            </div>
        );
    }
}

export default NavBar;