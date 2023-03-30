import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// import {FcGoogle } from 'react-icons/fc'
// import { auth } from '../firebase';
// import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
// import { GoogleAuthProvider } from 'firebase/auth';
// import { BsFacebook} from 'react-icons/bs'


  const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  
  // const handleClick = () =>{
  //   const provider = new GoogleAuthProvider()
  //   signInWithPopup(auth, provider)
  //   .then((res)=>{
  //       navigate('/account');
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }
  // const handleClickFb = () =>{
  //   const providerFb = new FacebookAuthProvider()
  //   signInWithPopup(auth, providerFb)
  //   .then((res)=>{
  //       navigate('/account');
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // } 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4 '>
      <div>
        <h1 className='text-2xl font-bold py-2  mt-2'>Sign in to your Passcoder account</h1>
        <p className='py-2'>
          Don't have an account yet?{' '}
          <Link to='/' className='underline'>
            Sign up.
          </Link>
        </p>
      </div>
      <br />
      { error ? 
      <Link>
                <div 
      style={{
        width:"100%",
        backgroundColor:"rgba(255, 0, 0, 0.122)",
        paddingRight:'1em',  
        paddingLeft:'1em', 
        paddingBottom:'0.5em', 
        borderLeft:"red solid 0.3em",
        paddingTop:'0.5em',
        alignItems:'center',
        display:'flex',
        }}>
        
        <p style={{fontSize:'0.9em', color:"red"}}>Your Email or Password not Correct, or you do not have an account with us
    </p> 
      </div>
      </Link> : 
        <p style={{fontSize:'0.8em', color:'blue'}}> </p>}
      <br />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input 
          placeholder='Enter your Email Address'
          onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input 
          placeholder='Enter your Password'
          onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
             <span>
             { error ?  
            <p style={{color:"red"}}></p> : 
            <p style={{fontSize:'0.8em', color:'blue'}}> </p>} 
            </span>

            <p onClick={(e)=>{navigate('/forgotPassword')}} style={{ color:'blue'}} >
                Forgot Password?
            </p>
        </div>
       

        <br />
        <button className='border border-blue-500 bg-[#292482] hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Submit
        </button><br /><br /><br />
      </form>
      {/* <button 
      
         onClick={handleClick}
        style={{
            border:"0.05em solid black", 
            borderRadius:"0.1em"}} 
            className=' w-full p-4 my-2 text-black mb-1' > 
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

export default Signin;