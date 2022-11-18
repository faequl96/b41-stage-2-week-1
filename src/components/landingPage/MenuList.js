import React, { useContext, useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { DataMenuList } from '../../data/DataMenuList';
import { useNavigate } from "react-router-dom"
import { AppContext } from '../contexts/AppContext';

const MenuList = () => {
    const navigate = useNavigate();
    const contexts = useContext(AppContext);

    return (
        <Container className='row justify-content-between m-auto pb-5' style={{ padding : "0 76px" }}>
            <h1 className='text-danger fw-bolder'>Let's Order</h1>
            {DataMenuList.map((item) => (
                <div className='col-3 p-3'>
                    <Card 
                        className='rounded-4 border-0 overflow-hidden shadow-sm' 
                        style={{ width: '100%', backgroundColor : '#f6dada', cursor: 'pointer' }} 
                        key={item.id} 
                        onClick={() => {
                            !contexts.loginContext.isLogin
                            ? contexts.showContext.setShowLogin(true)
                            : navigate(`/menu/${item.id}/${item.menuName}`); 
                        }}
                    >
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body className='pb-0'>
                            <h1 className='fs-6 text-danger fw-bolder'>{item.menuName}</h1>
                            <p className='align-self-start text-danger'>Rp. {item.price}.000</p>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </Container>
    );
}

export default MenuList;

