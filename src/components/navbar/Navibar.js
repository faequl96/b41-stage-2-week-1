import { useContext, useState } from 'react';
import {Button, Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import logo from '../../assets/logo.png';
import NavProfile from './NavProfile';
import { AppContext } from '../contexts/AppContext';

const style = {
  button: {
    width : "120px",
  }
}

function Navibar() {
  const contexts = useContext(AppContext)
  
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="white" expand={expand} className="mb-3 mt-4">
          <Container>
          <Navbar.Brand href="#">
            <img
              alt=""
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!contexts.loginContext.isLogin ? (
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Button onClick={() => contexts.showContext.setShowLogin(true)} variant='outline-danger' className='me-3 py-1 border border-3 border-danger fw-bold' style={style.button}>Login</Button>
                    <Button onClick={() => contexts.showContext.setShowRegister(true)} variant='outline-danger' className='py-1 border border-3 border-danger fw-bold' style={style.button}>Register</Button>
                  </Nav>
                ) : (
                  <NavProfile 
                    setIsLogin={contexts.loginContext.setIsLogin} 
                    role={localStorage.role}
                  />
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navibar;