import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Register({show, setShow, setShowLogin}) {
  const [regisData, setRegisData] = useState({
		email: '',
		password: '',
		fullname: '',
		role: '',
	});

	const registerHandler = () => {
			setShow(false);
			setShowLogin(true);
			setRegisData({
				...regisData,
				email: '',
				password: '',
				fullname: '',
				role: '',
			});
			// setRegisMessage('');
	};

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Body>
        <Modal.Title className="mb-5 fw-bolder fs-1 text-danger">Register</Modal.Title>
        <Form>
          <Form.Group className="mb-4">
            <Form.Control
              className='border border-3 border-danger'
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              className='border border-3 border-danger'
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              className='border border-3 border-danger'
              type="text"
              placeholder="Full Name"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Select
              className='border border-3 border-danger'
							aria-label='Default select example'
							name='role'
							value={regisData.role}
							onChange={(e) => {
								setRegisData({
									...regisData,
									[e.target.name]: e.target.value,
								});
							}}
						>
							<option>Role</option>
							<option value='user'>As User</option>
							<option value='partner'>As Partner</option>
					  </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Button variant='danger' className="w-100">Login</Button>
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
						clasName='text-primary'
					>
						Here
					</span>
				</p>
      </Modal.Body>
    </Modal>
  );
}

export default Register;