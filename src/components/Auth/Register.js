import React, { useState } from 'react';
import {Button, Form, Modal, Alert} from 'react-bootstrap';

function Register({show, setShow, setShowLogin, regisMessage, setRegisMessage}) {

  	const [regisData, setRegisData] = useState({
		email: '',
		password: '',
		fullName: '',
		role: '',
	});

	if(localStorage.getItem("userData") == null) {
		localStorage.setItem("userData", "[]");
	}

	const userData = JSON.parse(localStorage.getItem("userData"));

	const registerHandler = () => {
		for(let i = 0; i <= userData.length; i++) {
			if(userData.length === 0) {
				setShow(false);
				setShowLogin(true);
				setRegisMessage('');
				let userData = JSON.parse(localStorage.getItem("userData"));
				userData.push(regisData);
				userData[i].id = i + 1;
				localStorage.setItem("userData", JSON.stringify(userData));
				setRegisData({
					...regisData,
					email: '',
					password: '',
					fullName: '',
					role: '',
				});
			  	return;
			} else {
				if(userData[i].email === regisData.email) {
					setRegisMessage('Email sudah terdaftar!');
					  return;
				} else if(i === userData.length-1) {
					setShow(false);
					setShowLogin(true);
					setRegisMessage('');
					let userData = JSON.parse(localStorage.getItem("userData"));
					userData.push(regisData);
					userData[i+1].id = i + 2;
					localStorage.setItem("userData", JSON.stringify(userData));
					setRegisData({
						...regisData,
						email: '',
						password: '',
						fullName: '',
						role: '',
					});
				}
			}
		}
	};

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Body>
        <Modal.Title className="mb-5 fw-bolder fs-1 text-danger">Register</Modal.Title>
        <Form>
			{regisMessage !== '' && (
				<Alert className='fs-6 fw-bolder text-center' variant={'danger'}>
					{regisMessage}
				</Alert>
			)}
          <Form.Group className="mb-4">
		  	<Form.Control
              className='border border-3 border-danger'
              type="email"
              name="email"
              placeholder="Email"
              value={regisData.email}
              onChange={(e) =>
                setRegisData({ ...regisData, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
		  	<Form.Control
              className='border border-3 border-danger'
              type="password"
              name="password"
              placeholder="Password"
              value={regisData.password}
              onChange={(e) =>
                setRegisData({ ...regisData, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
		  	<Form.Control
              className='border border-3 border-danger'
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={regisData.fullName}
              onChange={(e) =>
                setRegisData({ ...regisData, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Select
			  className='border border-3 border-danger'
			  name='role'
			  value={regisData.role}
			  onChange={(e) => 
				setRegisData({...regisData, [e.target.name]: e.target.value})
			  }
		  	>
			  <option>Choose Role</option>
			  <option value='user'>As User</option>
			  <option value='admin'>As Admin</option>
			</Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Button variant='danger' className="w-100" onClick={registerHandler}>Register</Button>
          </Form.Group>
        </Form>
        <p className='text-muted'>
			Already have an account ? Click{' '}
			<span
			style={{ cursor: 'pointer' }}
			className='text-primary cursor-pointer'
			onClick={() => {
				setShow(false);
				setShowLogin(true);
			}}
			>
				Here
			</span>
		</p>
      </Modal.Body>
    </Modal>
  );
}

export default Register;