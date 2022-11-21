import { useContext } from "react";
import { Container, Image, Button, Form } from "react-bootstrap";
import { DataMenuList } from '../data/DataMenuList';
import { AppContext } from "../components/contexts/AppContext";
import barcodIcon from "../assets/barcod.png";
import logo from "../assets/logo.png";
import profileImage from "../assets/profileImg.png";

export const MyProfile = () => {
   let userLogin = JSON.parse(localStorage.getItem("userLogin"));
   let transactionDataUser = JSON.parse(localStorage.getItem(`transactionDataUser${userLogin.id}`));
   let transactionDataAdmin = JSON.parse(localStorage.getItem(`transactionDataAdmin`));
   let transactionStatus = [];
   for( let i = 0; i < transactionDataAdmin.length; i++) {
      if(transactionDataAdmin[i].userId === userLogin.id) {
         transactionStatus.push(transactionDataAdmin[i].status);
      }
   }
   for( let i = 0; i < transactionStatus.length; i++) {
      transactionDataUser[i].status = transactionStatus[i]
   }

   return (
      <Container
      className="row m-auto"
      style={{padding : "30px 86px"}}
      >
         <div className="col-6 pe-5">
            <div>
               <h3 className="fw-bolder fs-3 mb-4 text-danger" style={{color : "#984c4c"}}>My Profile</h3>
            </div>
            <div className="d-flex">
               <div className="col-5 pe-4">
                  <div className="rounded-2 overflow-hidden">
                     <Image className="w-100" src={profileImage}/>
                  </div>
               </div>
               <div className="col-7 ps-2 pt-2 pb-2">
                  <h5 className="fw-bold">Full Name</h5>
                  <p className="fs-5 fw-semibold">{userLogin.fullName}</p>
                  <h5 className="fw-bold">Email</h5>
                  <p className="fs-5 fw-semibold">{userLogin.email}</p>
               </div>
            </div>
            
         </div>
         <div className="col-6">
            <div>
               <h3 className="fw-bolder fs-3 mb-4" style={{color : "#984c4c"}}>My Transaction</h3>
            </div>
            {transactionDataUser.map((transactionSelected) => (
               <div className="d-flex rounded rounded-3 px-2 mb-3" style={{backgroundColor: '#f6dada'}}>
                  <div className="col-9 mt-2 mb-4 pt-2 ps-3">
                  {transactionSelected.transactionCart.map((item) => (
                     <div className="d-flex mb-2">
                        <div className="col-3 pe-3">
                           <div className="w-100 rounded rounded-3 overflow-hidden">
                              <Image className="w-100" src={DataMenuList[item.menuIndex].image}/>
                           </div>
                        </div>
                        <div className="col-9">
                           <div className="mb-3">
                              <p className="fw-bolder fs-6 mb-1" style={{color : "#c90e2d"}}>{item.menuName}</p>
                              <p className="text-danger fw-semibold mb-2" style={{fontSize: '0.7rem'}}>
                                 <span className="fw-bolder" style={{color : "#c90e2d"}}>{item.transactionDay},</span> {" "}
                                 {item.transactionTime}
                              </p>
                           </div>
                           
                           <div className="d-flex" style={{fontSize: "0.75rem"}}>
                              <p className="fw-bold mb-0 d-flex justify-content-between pe-2" style={{color : "#984c4c", width: "21%"}}>
                                 <p className="mb-1">Toping</p>
                                 <p className="mb-1">:</p>
                              </p>
                              <div className="col-9">
                                 {item.topingSelected.map((toping) => (
                                    <>
                                       <span className="fw-semibold text-danger">{toping},</span> {" "}
                                    </>
                                 ))}
                              </div>
                           </div>
                           <div className="d-flex" style={{fontSize: "0.75rem", color : "#984c4c"}}>
                              <p className="fw-bold mb-0 d-flex justify-content-between pe-2" style={{width: "21%"}}><p>Price</p><p>:</p></p> 
                              <p className="col-9">Rp. {item.price}.000</p>
                           </div>
                        </div>
                     </div>
                  ))}
                  </div>

                  <div className="col-3 mt-2 mb-3">
                     <div className="w-50 m-auto p-2">
                        <Image className="w-100" src={logo}/>
                     </div>
                     <div className="w-75 m-auto px-3 py-2">
                        <Image className="w-100" src={barcodIcon}/>
                     </div>
                     <div className="m-auto px-0 py-2">
                        <Button
                           variant='fw-semibold py-1' className="w-100 fw-semibold"
                           style={{color : "#00b1dd", backgroundColor: "rgba(0, 202, 232, .12)", fontSize: "0.75rem"}}
                        >
                           {transactionSelected.status}
                        </Button>
                     </div>
                     <div className="w-100 m-auto text-center">
                        <span className="fw-bold" style={{color : "#984c4c", fontSize: "0.75rem"}}>Total : Rp. {transactionSelected.transactionTotalPrice}.000</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </Container>
   );
};