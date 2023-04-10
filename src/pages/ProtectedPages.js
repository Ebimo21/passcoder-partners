import React from 'react';
import jsCookie from  "jscookie";
import { Navigate } from 'react-router-dom';


export default function ProtectedPages({children}) {

    const jwt = jsCookie.get('jwt')
    if(!jwt) return <Navigate to='/signup' />;
  return children
}
