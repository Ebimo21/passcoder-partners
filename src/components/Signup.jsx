import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 import { UserAuth } from '../context/AuthContext';
//  import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
//  import { FacebookAuthProvider } from 'firebase/auth';
//  import {FcGoogle } from 'react-icons/fc'
//  import { auth } from '../firebase';
//  import {BsFacebook } from 'react-icons/bs'

  //   const handleClick = () =>{
  //   const provider = new GoogleAuthProvider()
  //   signInWithPopup(auth, provider)
  //  .then((res)=>{
  //       navigate('/account');
  //   }).catch((err)=>{
  //       console.log(err)
  //   })
  //  } 

  //  const handleClickFb = () =>{
  //    const providerFb = new FacebookAuthProvider()
  //    signInWithPopup(auth, providerFb)
  //    .then((res)=>{
  //      navigate('/account');
  //  }).catch((err)=>{
  //      console.log(err)
  //   })
  //  } 


  const Signup = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [errorEmail, setErrorEmail] = useState(false)
      const [errorPassword, setErrorPassword] = useState(false)
      const [error, setError] =  useState('');

      const { createUser } = UserAuth();
      const navigate = useNavigate()
  
  // email form actions
    function handleEmailClick(e){
      setEmail(e.target.value)
      if(email.length===0){
        setErrorEmail(true)}
        else{
          if(email.length > 0){
            setErrorEmail(false)}
     }
    }
    function handleEmailFocus(e){
      if(email.length===0){
        setErrorEmail(true)}
        else{
          if(email.length > 0){
            setErrorEmail(false)}}
    }
    function handleEmailBlur(e){
      if(email.length < 1||email.length===0){
        setErrorEmail(true)}
        else{
          if(email.length > 1 ||email.length === 1 ){
            setErrorEmail(false)}

        }
    }

 // password form actions
 function handlePasswordClick(e){
  setPassword(e.target.value)

}
function handlePasswordFocus(e){
  
}
function handlePasswordBlur(e){
  setPassword(e.target.value)
}



 // confirm password form actions
 function handleConfirmPasswordClick(e){
  setConfirmPassword(e.target.value)
  if(confirmPassword === password){
    setErrorPassword(false)}
    else{
      if(confirmPassword !== password){
        setErrorPassword(true)}
 }
}
function handleConfirmPasswordFocus(e){
  if(confirmPassword === password){
    setErrorPassword(false)}
    else{
      if(confirmPassword !== password){
        setErrorPassword(true)}}
}
function handleconfirmPasswordBlur(e){
  if(confirmPassword === password){
    setErrorPassword(false)}
    else{
      if(confirmPassword !==password ){
        setErrorPassword(true)}

    }
}


  const handleSubmit = async (e) => {
     e.preventDefault();
    setError('');
     try {
      await createUser(email, password);
     navigate('/account')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2 mt-2'>Sign up for Passcoder(Step 2 0f 2)</h1>
        <p className='py-2'>
          Already have an account yet?{' '}
          <Link to='/signin' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <br />
      
      { error ?  
      <div 
      style={{
        width:"100%",
        backgroundColor:"rgba(255, 0, 0, 0.122)",
        paddingRight:'1em',  
        paddingLeft:'1em', 
        paddingBottom:'0.5em', 
        borderLeft:"red solid 0.3em",
        paddingTop:'0.5em'}}>

        <p style={{color:"red"}}>You've an existing account already, Please Sign In</p> 
      </div>: 
        <p style={{fontSize:'0.8em', color:'blue'}}> </p>}

      <br />
      <form onSubmit={handleSubmit}>
    

        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Enter your Email Address</label>

          <input
            required
            value={email}
            onChange={handleEmailClick}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            className='border p-3'
            type='email'
            placeholder='Enter your Email Address'
          />
           { errorEmail ?  
        <p style={{ fontSize:'0.8em',color:"red"}}>Enter a valid Email address</p> : 
        <p style={{fontSize:'0.8em', color:'blue'}}> </p>}
        </div>


        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Create a Password</label>
          <input
            required
            value={password}
            onChange={handlePasswordClick}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            className='border p-3'
            type='password'
            placeholder='Create your Password'
          />
       
        </div>


        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Create a Password</label>
          <input
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordClick}
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleconfirmPasswordBlur}
            className='border p-3'
            type='password'
            placeholder='Confirm your Password'
          />
                { errorPassword ?  
        <p style={{ fontSize:'0.8em', color:"red"}}>Passwords do not match</p> : 
        <p style={{fontSize:'0.8em', color:'green'}}></p>}
       
         </div>
      

        <br />
        <button 
        
        className='border border-blue-500 bg-[#292482] hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign Up
        </button>

      </form>
            <br/><br/>
        {/* <button 
      
         onClick={handleClick}
            style={{
            border:"0.05em solid black", 
            borderRadius:"0.1em"}} 
            className=' w-full p-4 my-2 text-black mb-2' > 
            <span style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <FcGoogle style={{marginRight:"1em"}} /> 
            <p>Continue With Google</p> </span></button> 

         <button 
            onClick={handleClickFb}
            style={{
            border:"0.05em solid black", 
            borderRadius:"0.1em"}} 
            className=' w-full p-4 my-2 text-black mb-7' > 
            <span style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <BsFacebook style={{marginRight:"1em", color:'blue'}} /> 
            <p>Continue With Facebook</p> </span></button>  */}
    </div>
  );
};

export default Signup;