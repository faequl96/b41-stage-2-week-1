import { Dropdown, Image, Badge, Nav } from 'react-bootstrap';

import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import cartIcon from '../../assets/cartIcon.png';
import profileImage from '../../assets/profileImage.png';

const NavProfile = ({ setIsLogin, role, setloginMessage }) => {
    const navigate = useNavigate();
	const logoutHandler = () => {
		localStorage.removeItem('role');
		setIsLogin(false);
	};

	return (
		<>
			<Nav className='ms-auto'>
				<div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }}>
					{role === 'user' && (
						<>
							<Image src={cartIcon} width='40px' height='40px' onClick={() => navigate('/cart/detail')}/>
							
								<Badge bg='danger' pill style={{ height: '25px', width: '25px' }} className='d-flex align-items-center justify-content-center fs-6 position-absolute ms-4'>
									3
								</Badge>
							
						</>
					)}

					<Dropdown>
						<Dropdown.Toggle variant='' id='dropdown-basic'>
							<Image src={profileImage} width='45px' height='45px' className='rounded-pill'/>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }} >
								<Link
									to={role === 'user' ? '/profile' : '/partner/profile'}
									className='text-dark text-decoration-none d-flex gap-2'
								>
									<Image src={profileImage} width='25px' />
									Profile
								</Link>
							</Dropdown.Item>
							{role === 'partner' && (
								<Dropdown.Item className='d-flex gap-2 align-items-center border-bottom' style={{ height: '50px' }}>
									<Link to='/partner/add-product' className='text-dark text-decoration-none d-flex gap-2'>
										<Image src={cartIcon} width='25px' />
										Add Product
									</Link>
								</Dropdown.Item>
							)}
							<Dropdown.Item
								className='d-flex gap-2 align-items-center'
								style={{ height: '50px' }}
								onClick={() => {
									logoutHandler();
									navigate('/');
								}}
							>
								<Image src={cartIcon} width='25px' />
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</Nav>
		</>
	);
};

export default NavProfile;