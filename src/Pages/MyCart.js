import { useContext, useState } from "react";
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
      contexts.cartContext.setCartLength(myCart.length);
		localStorage.setItem(`myCart${userLogin.id}`, JSON.stringify(myCart));
   }

   const [transactionDataForAdmin, setTransactionDataForAdmin] = useState({
      name: "",
      email: "",
      phone: "",
      posCode: "",
      address: "",
      income: totalPrice,
      status: "Waiting Approve"
   });

   const transactionHandler = () => {
      const days = new Date().getDay();
      let day = ""
      if(days === 0) {
         day = "Sunday"
      } else if(days === 1) {
         day = "Monday"
      } else if(days === 2) {
         day = "Tuesday"
      } else if(days === 3) {
         day = "Wednesday"
      } else if(days === 4) {
         day = "Thursday"
      } else if(days === 5) {
         day = "Friday"
      } else if(days === 6) {
         day = "Saturday"
      }
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear()
      const transactionTime = `${date} ${month} ${year}`
      let userLogin = JSON.parse(localStorage.getItem("userLogin"));
      let myCart = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));
      let addTransactionDataUser = {transactionTotalPrice: totalPrice, transactionDay: day, transactionTime, transactionCart: myCart}
      let transactionDataUser = JSON.parse(localStorage.getItem(`transactionDataUser${userLogin.id}`));
      transactionDataUser.push(addTransactionDataUser);
      localStorage.setItem(`transactionDataUser${userLogin.id}`, JSON.stringify(transactionDataUser));
      localStorage.setItem(`myCart${userLogin.id}`, '[]');
      let myCartLength = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));
      contexts.cartContext.setCartLength(myCartLength.length);

      let transactionDataAdmin = JSON.parse(localStorage.getItem(`transactionDataAdmin`));
      transactionDataAdmin.push(transactionDataForAdmin);
      localStorage.setItem("transactionDataAdmin", JSON.stringify(transactionDataAdmin));
      setTransactionDataForAdmin({name: "", email: "", phone: "", posCode: "", address: "", income: totalPrice, status: "Waiting Approve"})
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
                  <div className="row mt-2 mb-4">
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
                        <Image 
                           className="ms-auto" 
                           width="26" style={{ cursor: "pointer"}} 
                           src={trashIcon}
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
                     type="text"
                     name="name"
                     placeholder="Name"
                     value={transactionDataForAdmin.name}
                     onChange={(e) =>
                        setTransactionDataForAdmin({ ...transactionDataForAdmin, [e.target.name]: e.target.value })
                     }
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Form.Control
                     style={{ paddingTop: "8px", paddingBottom: "8px" }}
                     className='border border-3 border-danger fs-5'
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={transactionDataForAdmin.email}
                     onChange={(e) =>
                        setTransactionDataForAdmin({ ...transactionDataForAdmin, [e.target.name]: e.target.value })
                     }
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Form.Control
                     style={{ paddingTop: "8px", paddingBottom: "8px" }}
                     className='border border-3 border-danger fs-5'
                     type="text"
                     name="phone"
                     placeholder="Phone"
                     value={transactionDataForAdmin.phone}
                     onChange={(e) =>
                        setTransactionDataForAdmin({ ...transactionDataForAdmin, [e.target.name]: e.target.value })
                     }
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Form.Control
                     style={{ paddingTop: "8px", paddingBottom: "8px" }}
                     className='border border-3 border-danger fs-5'
                     type="text"
                     name="posCode"
                     placeholder="Pos Code"
                     value={transactionDataForAdmin.posCode}
                     onChange={(e) =>
                        setTransactionDataForAdmin({ ...transactionDataForAdmin, [e.target.name]: e.target.value })
                     }
                  />
               </Form.Group>
               <Form.Group className="mb-5">
                  <Form.Control as="textarea" 
                     style={{ paddingTop: "8px", paddingBottom: "8px" }}
                     rows={3} 
                     className='border border-3 border-danger fs-5'
                     name="address"
                     placeholder="Address"
                     value={transactionDataForAdmin.address}
                     onChange={(e) =>
                        setTransactionDataForAdmin({ ...transactionDataForAdmin, [e.target.name]: e.target.value })
                     }
                  />
               </Form.Group>
               <Form.Group className="mb-4">
                  <Button variant='danger fw-semibold' className="w-100 fs-5" style={{ paddingTop: "5px", paddingBottom: "7px" }}
                     onClick={transactionHandler}
                  >
                     Pay
                  </Button>
               </Form.Group>
            </Form>
         </div>
      </Container>
   );
};