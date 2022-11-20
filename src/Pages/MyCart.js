import { useContext } from "react";
import { Container, Image, Button, Form } from "react-bootstrap";
import { DataMenuList } from '../data/DataMenuList';
import { AppContext } from "../components/contexts/AppContext";
import trashIcon from "../assets/trash.png";
import attachIcon from "../assets/attache.png";

export const MyCart = () => {
   const contexts = useContext(AppContext);

   let userLogin = JSON.parse(localStorage.getItem("userLogin"));
   let myCart = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));

   let price = myCart.map((item) => item.price)
   const totalPrice = price.reduce((a, b) => a + b, 0);

   const reduceCartHandler = (cartIdSelected) => {
      const newMyCart = myCart.filter(cart => cart.cartId !== cartIdSelected);
      myCart = newMyCart;
      console.log(myCart);
      contexts.cartContext.setCartLength(myCart.length);
		localStorage.setItem(`myCart${userLogin.id}`, JSON.stringify(myCart));
   }
   
   return (
      <Container
      className="row m-auto"
      style={{padding : "30px 86px"}}
      >
         <div className="mb-4 col-8 pe-5">
            <div className="border-bottom border-1 border-dark">
               <h3 className="fw-bolder fs-2 mb-4 text-danger">My Cart</h3>
               <h6 className="fw-semibold fs-5 mb-3 text-danger">Review Your Order</h6>
            </div>
            <div className="border-bottom border-1 border-dark pt-2 pb-2">
               {myCart.map((cart) => (
                  <div className="row mt-2 mb-4 deleteCartItem" value={cart.menuIndex}>
                     <div className="col-2">
                        <div className="w-100">
                           <Image className="w-100" src={DataMenuList[cart.menuIndex].image}/>
                        </div>
                     </div>
                     <div className="col-8 pe-0">
                        <p className="text-danger fw-bolder fs-5">{cart.menuName}</p>
                        <div className="row">
                           <p className="col-2 fw-bold pe-0" style={{color : "#984c4c"}}>Toping :</p>
                           <div className="col-9 ps-0">
                              {cart.topingSelected.map((item) => (
                                 <>
                                    <span className="fw-semibold fs-6 text-danger">{item},</span> {" "}
                                 </>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="col-2 d-grid">
                        <p className="text-end fw-semibold text-danger">Rp. {cart.price}.000</p>
                        <Image className="ms-auto" width="26" style={{ cursor: "pointer"}} src={trashIcon}
                           onClick={() => reduceCartHandler(cart.cartId)}
                        />
                        <p className="opacity-0">space</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="">
               <div className="d-flex mt-4 mb-2 text-danger fw-semibold">
                  <div className="col-7 pe-4 pt-3">
                     <div className="border-top border-bottom border-1 border-dark">
                        <div className="d-flex pt-3">
                           <p className="col-6 text-start">Subtotal</p>
                           {totalPrice > 0 ? (
                              <p className="col-6 text-end">Rp. {totalPrice}.000</p>
                           ) : (
                              <p className="col-6 text-end">Rp. {totalPrice}</p>
                           )}
                        </div>
                        <div className="d-flex pb-1">
                           <p className="col-6 text-start">Qty</p>
                           <p className="col-6 text-end">{myCart.length}</p>
                        </div>
                     </div>
                     <div className="d-flex pt-3 fw-bolder">
                        <p className="col-6 text-start">Total</p>
                        {totalPrice > 0 ? (
									<p className="col-6 text-end">Rp. {totalPrice}.000</p>
								) : (
									<p className="col-6 text-end">Rp. {totalPrice}</p>
								)}
                     </div>
                  </div>
                     
                  <div className="col-5 d-grid pt-3">
                     <Image src={attachIcon} className="ms-auto" style={{ width: '240px' }}/>
                  </div>
               </div>
            </div>
         </div>
         <div className="col-4 ps-4">
            <Form style={{ marginTop: "100px" }}>
               <Form.Group className="mb-4">
                  <Form.Control
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                  className='border border-3 border-danger fs-5'
                  type="name"
                  name="name"
                  placeholder="Name"
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Form.Control
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                  className='border border-3 border-danger fs-5'
                  type="email"
                  name="email"
                  placeholder="Email"
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Form.Control
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                  className='border border-3 border-danger fs-5'
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Form.Control
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                  className='border border-3 border-danger fs-5'
                  type="text"
                  name="poscode"
                  placeholder="Pos Code"
                  />
               </Form.Group>
               <Form.Group className="mb-5">
                  <Form.Control as="textarea" 
                     style={{ paddingTop: "8px", paddingBottom: "8px" }}
                     rows={3} 
                     className='border border-3 border-danger fs-5'
                     placeholder="Address"
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Button variant='danger fw-semibold' className="w-100 fs-5" style={{ paddingTop: "5px", paddingBottom: "7px" }}>Pay</Button>
               </Form.Group>
            </Form>
         </div>
      </Container>
   );
};