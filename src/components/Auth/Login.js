import React, { useContext, useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { userData } from '../../data/userData';
import { AppContext } from '../contexts/AppContext';

function Login({show, setShow, setShowRegister, setIsLogin, loginMessage, setLoginMessage}) {

  // const contexts = useContext(AppContext)

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  function loginHandler() {
    for(let i = 0; i <= userData.length; i++) {
      if(userData[i].email == loginData.email) {
        for(let i = 0; i <= userData.length; i++) {
          if(userData[i].email == loginData.email && userData[i].password == loginData.password) {
            localStorage.setItem("role", 'user');
            setIsLogin(true);
            setShow(false);
            setLoginMessage('');
            setLoginData({email: "", password: ""})
            i = userData.length;
          } else if(i == userData.length-1) {
            setLoginMessage('Password Salah!')
          }
        }
        return;
      } else if(i == userData.length-1) {
        setLoginMessage('Email belum terdaftar!')
      }
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Body>
        <Modal.Title className="mb-5 fw-bolder fs-1 text-danger">Login</Modal.Title>
        <Form>
          {loginMessage != '' && (
						<Alert className='fs-6 fw-bolder text-center' variant={'danger'}>
							{loginMessage}
						</Alert>
					)}
          <Form.Group className="mb-4">
            <Form.Control
              className='border border-3 border-danger'
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              className='border border-3 border-danger'
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Button variant='danger' className="w-100" onClick={loginHandler}>Login</Button>
          </Form.Group>
          
        </Form>
        <p className="text-muted">
          Don't have an account ? click{" "}
          <span
            style={{ cursor: "pointer" }}
            className="text-primary"
            onClick={() => {
              setShow(false);
              setShowRegister(true);
            }}
          >
            Here
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default Login;