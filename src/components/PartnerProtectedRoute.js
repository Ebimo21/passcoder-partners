// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import jsCookie from 'js-cookie';
// import { Partner } from './Partners/config/apiCalls';

// const ProtectedRoute = ({ children }) => {
//   const [jwt, setJwt] = useState(jsCookie.get("jwt"))
//   const [authenticatedUser, setAuthenticatedUser] = useState(false)

//   useEffect(()=>{
//     async function authenticate (){
//       const response = await Partner(jwt)
//       if(response?.status === 401){
//          setAuthenticatedUser(false)
//         console.log(response)}
//       else{ setAuthenticatedUser(true) }
      
//     }

//     authenticate()

//   }, [])

//   if (!authenticatedUser) {
//     return <Navigate to='/partners-signin' />;
//   }
//   return children;
// };

// export default ProtectedRoute;

// import React, { useEffect, useState } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import jsCookie from 'js-cookie';
// import { Partner, PartnersLogOut } from './Partners/config/apiCalls';

// const ProtectedRoute = ({ children, ...rest }) => {
//   // const jwt = jsCookie.get("jwt")
//   const [authenticatedUser, setAuthenticatedUser] = useState(false)
//   const [jwt, setJwt] = useState(jsCookie.get("jwt"))
  
//   useEffect(()=>{
//     async function authenticate (){
//       const response = await Partner(jwt)
//       console.log(response.status)
//       console.log(authenticatedUser)
//       if(response.status === 401) {setAuthenticatedUser(false); PartnersLogOut(); setJwt(jsCookie.get("jwt"))}
//       else {setAuthenticatedUser(true);}
//     }

//     authenticate()

//   },[])

//   if (false  ) {
//     return <Navigate to='/partners-signin' />;
//   }
//   console.log(authenticatedUser)
//   return <Route {...rest} elements={children} />;
// };

// export default ProtectedRoute;


import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import CheckAuth from './Partners/CheckAuth';

const ProtectedRoute =  ({ children }) => {
  const [jwt, setJwt] = useState(jsCookie.get("jwt"))
  const [user, setUser] = useState(false)

  useEffect(()=>{
    const setAuth =async()=>{
      const user =  await CheckAuth()
      console.log(user)
      
      if (!user) {
        return <Navigate to='/partners-signin' />;
      }
      return children;
    }
    
    setAuth()

  }, [])


};

export default ProtectedRoute;