import { Dropdown, Image, Badge, Nav } from 'react-bootstrap';

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppContext } from '../contexts/AppContext';

import cartIcon from '../../assets/cartIcon.png';
import profileImage from '../../assets/profileImage.png';
import profileIcon from '../../assets/profile.png';
import logoutIcon from '../../assets/logout.png';
import drinkIcon from '../../assets/drink.png';
import topingIcon from '../../assets/toping.png';


const NavProfile = ({ setIsLogin, role }) => {
	const navigate = useNavigate();
   	const contexts = useContext(AppContext);

	const logoutHandler = () => {
		localStorage.setItem('isLogin', false);
		localStorage.setItem('userLogin', JSON.stringify({id: 0}))
		localStorage.setItem(`myCart0`, '[]')
		setIsLogin(false);
	};

	return (
		<>
			<Nav className='ms-auto'>
				<div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }}>
					{role === 'user' && (
						<>
							<Image src={cartIcon} width='40px' height='40px' onClick={() => navigate('/mycart')}/>
							{contexts.cartContext.cartLength > 0 && (
								<Badge bg='danger' pill style={{ height: '25px', width: '25px' }} className='d-flex align-items-center justify-content-center fs-6 position-absolute ms-4'>
									{contexts.cartContext.cartLength}
								</Badge>
							)}
						</>
					)}

					<Dropdown>
						<Dropdown.Toggle variant='' id='dropdown-basic'>
							<Image src={profileImage} width='45px' height='45px' className='rounded-pill'/>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }} >
								<Link
									to={role === 'user' ? '/myprofile' : '/partner/profile'}
									className='text-dark text-decoration-none d-flex gap-2'
								>
									{role === 'user' ? (
										<>
											<Image src={profileIcon} width='25px' />
											<span>Profile</span>
										</>
									) : (
										<>
											<Image src={profileIcon} width='25px' />
											<span>Transaction</span>
										</>
									)}
								</Link>
							</Dropdown.Item>
								{role === 'admin' && (
									<>
										<Dropdown.Item className='d-flex gap-2 align-items-center border-bottom' style={{ height: '50px' }}>
											<Link to='/partner/add-product' className='text-dark text-decoration-none d-flex gap-2'>
												<Image src={drinkIcon} width='25px' />
												Add Product
											</Link>
										</Dropdown.Item>
										<Dropdown.Item className='d-flex gap-2 align-items-center border-bottom' style={{ height: '50px' }}>
											<Link to='/partner/add-toping' className='text-dark text-decoration-none d-flex gap-2'>
												<Image src={topingIcon} width='25px' />
												Add Toping
											</Link>
										</Dropdown.Item>
									</>
								)}
							<Dropdown.Item
								className='d-flex gap-2 align-items-center'
								style={{ height: '50px' }}
								onClick={() => {
									logoutHandler();
									navigate('/');
								}}
							>
								<Image src={logoutIcon} width='25px' />
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