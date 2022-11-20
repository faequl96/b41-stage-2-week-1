import { useContext, useEffect, useState } from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { DataMenuList } from '../data/DataMenuList';
import { DataTopingList } from '../data/DataTopingList';
import checkIcon from '../assets/check.png';
import { AppContext } from "../components/contexts/AppContext";

export const DetailProduct = () => {
   const { id } = useParams();
   const contexts = useContext(AppContext);

   const [checkToping1, setCheckToping1] = useState(false);
   const [checkToping2, setCheckToping2] = useState(false);
   const [checkToping3, setCheckToping3] = useState(false);
   const [checkToping4, setCheckToping4] = useState(false);
   const [checkToping5, setCheckToping5] = useState(false);
   const [checkToping6, setCheckToping6] = useState(false);
   const [checkToping7, setCheckToping7] = useState(false);
   const [checkToping8, setCheckToping8] = useState(false);

   let [totalPrice, setTotalPrice] = useState(DataMenuList[id - 1].price);
   let [topingSelected, setTopingSelected] = useState([]);

   let userLogin = JSON.parse(localStorage.getItem("userLogin"));
   if(localStorage.getItem(`cartId${userLogin.id}`) == null) {
		localStorage.setItem(`cartId${userLogin.id}`, 0);
	}
   let cartIdUserLogin = JSON.parse(localStorage.getItem(`cartId${userLogin.id}`));

   let [cartData, setCartData] = useState({
      cartId: cartIdUserLogin,
      menuIndex: id - 1,
      menuName: DataMenuList[id - 1].menuName,
      price: totalPrice,
      topingSelected: topingSelected
   });

   useEffect(() => {
      setCartData({ ...cartData, price: totalPrice })
   }, [totalPrice])

   useEffect(() => {
      setCartData({ ...cartData, topingSelected: topingSelected })
   }, [topingSelected])
   

   const addCartHandler = () => {
      cartData.cartId = cartData.cartId + 1;
      let userLogin = JSON.parse(localStorage.getItem("userLogin"));
      localStorage.setItem(`cartId${userLogin.id}`, cartData.cartId);
      let myCart = JSON.parse(localStorage.getItem(`myCart${userLogin.id}`));
		myCart.push(cartData);
      contexts.cartContext.setCartLength(myCart.length);
		localStorage.setItem(`myCart${userLogin.id}`, JSON.stringify(myCart));
      setCheckToping1(false);
      setCheckToping2(false);
      setCheckToping3(false);
      setCheckToping4(false);
      setCheckToping5(false);
      setCheckToping6(false);
      setCheckToping7(false);
      setCheckToping8(false);
      setTotalPrice(DataMenuList[id - 1].price);
      setTopingSelected([])
   }
   
   return (
      <Container
      className="row m-auto"
      style={{padding : "30px 90px"}}
      >
         <div className="mb-4 col-5 pe-5">
            <Image src={DataMenuList[id - 1].image} width="100%"/>
         </div>
         <div className="col-7" style={{ fontSize: "1.15rem" }}>
               <h3 className="fs-1 fw-bolder mb-3 text-danger">{DataMenuList[id - 1].menuName}</h3>
               <p className="fs-4 fw-semibold mb-5" style={{color : "#984c4c"}}>Rp. {DataMenuList[id - 1].price}.000</p>
               <p className="fs-2 fw-bold" style={{color : "#984c4c"}}>Toping</p>
               <div className="row">
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[0].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping1(!checkToping1); 
                           !checkToping1
                           ? setTotalPrice(totalPrice + DataTopingList[0].price)
                           : setTotalPrice(totalPrice - DataTopingList[0].price);

                           if(!checkToping1) {
                              topingSelected.push(DataTopingList[0].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[0].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping1 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[0].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[1].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping2(!checkToping2); 
                           !checkToping2
                           ? setTotalPrice(totalPrice + DataTopingList[1].price)
                           : setTotalPrice(totalPrice - DataTopingList[1].price)

                           if(!checkToping2) {
                              topingSelected.push(DataTopingList[1].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[1].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping2 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[1].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[2].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping3(!checkToping3); 
                           !checkToping3
                           ? setTotalPrice(totalPrice + DataTopingList[2].price)
                           : setTotalPrice(totalPrice - DataTopingList[2].price)

                           if(!checkToping3) {
                              topingSelected.push(DataTopingList[2].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[2].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping3 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[2].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[3].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping4(!checkToping4); 
                           !checkToping4
                           ? setTotalPrice(totalPrice + DataTopingList[3].price)
                           : setTotalPrice(totalPrice - DataTopingList[3].price)

                           if(!checkToping4) {
                              topingSelected.push(DataTopingList[3].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[3].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping4 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[3].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[4].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping5(!checkToping5); 
                           !checkToping5
                           ? setTotalPrice(totalPrice + DataTopingList[4].price)
                           : setTotalPrice(totalPrice - DataTopingList[4].price)

                           if(!checkToping5) {
                              topingSelected.push(DataTopingList[4].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[4].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping5 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[4].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[5].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping6(!checkToping6); 
                           !checkToping6
                           ? setTotalPrice(totalPrice + DataTopingList[5].price)
                           : setTotalPrice(totalPrice - DataTopingList[5].price)

                           if(!checkToping6) {
                              topingSelected.push(DataTopingList[5].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[5].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping6 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[5].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[6].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping7(!checkToping7); 
                           !checkToping7
                           ? setTotalPrice(totalPrice + DataTopingList[6].price)
                           : setTotalPrice(totalPrice - DataTopingList[6].price)

                           if(!checkToping7) {
                              topingSelected.push(DataTopingList[6].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[6].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping7 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[6].topingName}</p>
                  </div>
                  <div className='col-3 text-center p-0 mb-2 mt-3 position-relative'>
                     <img src={DataTopingList[7].image} alt="" className="w-50 mb-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                           setCheckToping8(!checkToping8); 
                           !checkToping8
                           ? setTotalPrice(totalPrice + DataTopingList[7].price)
                           : setTotalPrice(totalPrice - DataTopingList[7].price)

                           if(!checkToping8) {
                              topingSelected.push(DataTopingList[7].topingName)
                           } else {
                              for(let i = 0; i <= topingSelected.length; i++) {
                                 if(topingSelected[i] === DataTopingList[7].topingName) {
                                    topingSelected.splice(i, 1);
                                 }
                              }
                           }
                        }}
                     />
                     {checkToping8 ? (
                        <Badge bg='success' pill style={{ height: '25px', width: '25px', top: '60px', right: '34px' }} className='d-flex align-items-center justify-content-center position-absolute'>
                           <img src={checkIcon} alt="" style={{ height: '25px', width: '25px' }}/>
								</Badge>
                     ) : (
                        ""
                     )}
                     <p className="fs-6 fw-semibold text-danger">{DataTopingList[7].topingName}</p>
                  </div>
               </div>
               <div className='row justify-content-between mt-5 mb-3' style={{color : "#984c4c"}}>
                  <p className="col-3 fs-4 fw-bolder">Total</p>
                  <p className="col-3 fs-4 fw-bolder text-end">Rp. {totalPrice}.000</p>
               </div>
               <Button variant='danger' className="w-100 fw-bold" onClick={() => addCartHandler()}>Add Cart</Button>
         </div>
      </Container>
   );
};