import React, { useRef } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAnalysis } from '../analysis';
import { loadFile } from '../analysis/actions';

export const NavMenu = () => {
    const inputFile = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const [, dispatch] = useAnalysis();

    const onChange = () => {
        const { path } = inputFile.current.files[0];
        console.log("Loading:", path);
        dispatch(loadFile(path));
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="File" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1" onClick={onButtonClick}>Open</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Exit</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <input onChange={onChange} type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
        </Navbar>);
};