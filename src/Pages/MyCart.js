import { useContext, useEffect, useState } from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { DataMenuList } from '../data/DataMenuList';
import { DataTopingList } from '../data/DataTopingList';
import checkIcon from '../assets/check.png';
import { AppContext } from "../components/contexts/AppContext";
import trashIcon from "../assets/trash.png";

export const MyCart = () => {
   const contexts = useContext(AppContext);

   let userLogin = JSON.parse(localStorage.getItem("userLogin"));
   let myCart = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));

   useEffect(() => {
      
   }, [])

   const reduceCartHandler = () => {
      let userLogin = JSON.parse(localStorage.getItem("userLogin"));
      let myCart = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));
		myCart.push();
      contexts.cartContext.setCartLength(myCart.length);
		localStorage.setItem(`myCart${userLogin.id}`, JSON.stringify(myCart));
   }
   
   return (
      <Container
      className="row m-auto bg-success"
      style={{padding : "30px 86px"}}
      >
         <div className="mb-4 col-8 pe-5 bg-warning">
            <div className="border-bottom border-2 border-dark">
               <h3>My Cart</h3>
               <h6>Review Your Order</h6>
            </div>
            <div className="border-bottom border-2 border-dark pt-2 pb-2">
               {myCart.map((cart) => (
                  <div className="row mt-2 mb-2">
                     <div className="col-2">
                        <div className="w-100">
                           <Image className="w-100" src={DataMenuList[cart.menuIndex].image}/>
                        </div>
                     </div>
                     <div className="col-8 pe-0 bg-warning">
                        <p className="text-danger fw-bolder fs-5">{cart.menuName}</p>
                        <div className="row">
                           <p className="col-2 fw-bold pe-0" style={{color : "#984c4c"}}>Toping :</p>
                           <div className="col-9 ps-0">
                              {cart.topingSelected.map((item) => (
                                 <>
                                    <span>{item}</span>, {" "}
                                 </>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="col-2 bg-warning d-grid">
                        <p className="text-end fw-semibold">Rp. {cart.price}.000</p>
                        <Image className="ms-auto" width="26" src={trashIcon}/>
                        <p className="opacity-0">space</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="">
               <div className="d-flex mt-2 mb-2 justify-content-between">
                  <div className="col-7 bg-danger p-4 border-top border-bottom border-1">
                     <div className="row">
                        <p className="col-6 text-start">Subtotal</p>
                        <p className="col-6 text-end">69.000</p>
                     </div>
                  </div>
                     
                  <div className="col-5 bg-primary d-grid">

                  </div>
               </div>
            </div>
         </div>
         <div className="col-4 bg-primary" style={{ fontSize: "1.15rem" }}>
            <Button variant='danger' className="w-100 fw-bold">Add Cart</Button>
         </div>
      </Container>
   );
};