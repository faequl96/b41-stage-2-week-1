import { Hero } from "../components/landingPage/Hero";
import MenuList from "../components/landingPage/MenuList";

export const LandingPage = () => {
   const userLogin = JSON.parse(localStorage.getItem("userLogin"));
   const isLogin = JSON.parse(localStorage.getItem("isLogin"));
   return (
      <>
         <Hero/>
         {isLogin ? (
         <>
            {userLogin.role === 'user' && (
               <MenuList/>
            )}
         </>
         ) : (
            <MenuList/>
         )}
      </>
   );
};