import React, { useReducer, useRef, useState } from 'react'
import RightBar from '../RightBar'
import SideBar from '../SideBar'
import avatar from '../assets/Profile-setting-avatar.png'
import AddToken from '../modal/AddToken'
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav'
import UsePartnerDetails from '../context/partnerDetails.context'
import { PartnerComplianceCertificate, PartnerComplianceDetails, PartnerComplianceDocument, PartnerProofComplianceDocument, PartnerProofProfilePhoto, PartnerUploadPhoto } from '../config/apiCalls'
import jsCookie from 'js-cookie'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import Congratulations from '../modal/Congratulations'
import Error from '../modal/Error'

import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"




function PartnersBusinessSettings() {

    const storage = getStorage()
    


    const [partnerDetails, refresh] = UsePartnerDetails()
    const [jwt, setJwt] = useState(jsCookie.get('jwt'))
    let navigate = useNavigate()
    const [tab, setTab] = useState("account-setting")
    const [showMenu, setShowMenu] = useState(false)

    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")

    const formEl = useRef()


    const signupForm ={
        company_name: "",
        company_email: "",
        company_rc_number: "",
        company_type: "",
        company_address: "",
    }
    const SIGNUPACTION ={
        COMPANY_NAME: "company_name",
        COMPANY_EMAIL: "company_email",
        COMPANY_RC_NUMBER: "company_rc_number",
        COMPANY_TYPE: "company_type",
        COMPANY_ADDRESS: "company_address"
    }
    const reducer=(state, action)=>{
        const {type, payload} = action
        switch(type){
            case SIGNUPACTION.COMPANY_NAME:
                return {...state, company_name: payload}
            case SIGNUPACTION.COMPANY_EMAIL:
                return {...state, company_email: payload}
            case SIGNUPACTION.COMPANY_RC_NUMBER:
                return {...state, company_rc_number: payload}
            case SIGNUPACTION.COMPANY_TYPE:
                console.log(payload)
                return {...state, company_type: payload}
            case SIGNUPACTION.COMPANY_ADDRESS:
                return {...state, company_address: payload}
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, signupForm)
    
    const handleLoop= (e)=>{
      const el = formEl.current.elements
      for(let i=0; i<el?.length; i++){
        //   console.log(el[i].value)
          console.log(el[i].name)
          dispatch({type: el[i].name, payload: el[i].value})
        }
        // console.log(el);
        console.log(state);
    }
    const handleUpdateBusinessDetails = async(e)=>{
        e.preventDefault()
    
        const response = await PartnerComplianceDetails(jwt, state)
        console.log(response)
    
        refresh()
        
    
        if(response.success){
            setNotification(response)
            setSuccessNotification(true)
            
          }else{
            setNotification(response)
            setErrorNotification(true)
          }
    }

    const handleRegistrationCertificate =async(e)=>{
        e.preventDefault()
        const el = formEl?.current?.elements[0].files[0]
        let response = await PartnerProofComplianceDocument(jwt, partnerDetails.partner_unique_id)
        const filename = response.filename.data
        // const filename = response.filename.data[0].registration_certificate
console.log("hi");
        console.log(filename)
        let profilePhoto = ""
        
        const sotrageRef = ref(storage, "partner/"+filename)
        const uploadTask =  uploadBytesResumable(sotrageRef,el)

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    profilePhoto = downloadURL
                    await setRegistrationCertificateUpload(profilePhoto)
                console.log('File available at', downloadURL);
                });
              
            }
        )
    }

    const setRegistrationCertificateUpload = async(profilePhoto) =>{
       const response = await PartnerComplianceCertificate(jwt, profilePhoto)
        
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        refresh()

        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }
    const handleRegistrationDocument =async(e)=>{
        e.preventDefault()
        const el = formEl?.current?.elements[0].files[0]
        let response = await PartnerProofComplianceDocument(jwt, partnerDetails.partner_unique_id)
        const filename = response.filename.data[0].registration_certificate
        console.log("filesrrdddr");
        console.log(filename.registration_certificate    )
        console.log(filename    )
        let profilePhoto = ""
        
        const sotrageRef = ref(storage, "partner/"+filename)
        const uploadTask =  uploadBytesResumable(sotrageRef,el)

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    profilePhoto = downloadURL
                    await setRegistrationDocumentUpload(profilePhoto)
                console.log('File available at', downloadURL);
                });
              
            }
        )
    }

    const setRegistrationDocumentUpload = async(profilePhoto) =>{
       const response = await PartnerComplianceDocument(jwt, profilePhoto)
        
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        refresh()

        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }

    

  return (
    <div>
      <SideBar show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
      <RightBar/>
      <div  className='p-5 md:pl-14 md:ml-[250px] lg:mr-[250px]'>
        <Nav lead={"Settings"} action={(e)=>setShowMenu(prev=>!prev)} />
            <div>
                <img width={58} height={58} src={avatar} />
            </div>
            <div>
                <p className="font-bold">Gabriel Ekwu</p>
                <p className='text-[10px]'>Digital ID: 1234567890</p>
                <p className='text-center mt-2 text-[10px]'>Profile URL: <a href='#' className='underline'>partners.passcoder.io/business-name</a> - Click to copy</p>
            </div>

            <div className='flex items-center gap-4 mt-5 mb-10'>
                <span className='pb-2 border-b-2 border-b-solid border-b-purple text-purple' onClick={(event)=>{navigate('/partners-settings')}}>Account Setting </span>
                <span onClick={(event)=>{navigate('/partners-business-settings')}}>Business Setting </span>
            </div>

            <div>
            
                    
            <form onChange={handleLoop} ref={formEl} onSubmit={handleUpdateBusinessDetails}>
                        <div className='flex items-center flex-wrap gap-3'>
                            <label className='basis-full '>Company Name</label>
                            <input 
                                className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400  outline-none" 
                                type="text" 
                                name="company_name"
                                // onChange={(e)=>dispatch({type: SIGNUPACTION.NAME, payload: e.target.value} )}
                                // onChange={}
                                defaultValue={partnerDetails?.company_name} 
                                 />

                               

                        </div>

                        <div className='flex items-center flex-wrap gap-3 mt-2'>
                                <label className='basis-full '>Company Email</label>
                                <input 
                                  className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                  name="company_email"
                                   
                                  defaultValue={partnerDetails?.company_email} />
                               

                        </div>
                        <div className='flex items-center flex-wrap gap-3'>
                                <label className='basis-full '>Company RC Number</label>
                                <input 
                                  className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                  name="company_rc_number"
                                   
                                  defaultValue={partnerDetails?.company_rc_number} />
                               

                               
                        </div>
                        <div className='flex items-center flex-wrap gap-3'>
                                <label className='basis-full '>Company Type</label>
                                {/* <input 
                                  className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                //   placeholder="City" 
                                
                            defaultValue={partnerDetails?.company_type} /> */}
                            
                                  
                                  <select
                                    name="company_type"
                                   >
                                    <option defaultValue>RC</option>
                                    <option>BN</option>
                                    <option>IT</option>
                                    <option>LL</option>
                                    <option>LLP</option>
                                  </select>
                               
                        </div>
                        <div className='flex items-center flex-wrap gap-3'>
                                <label className='basis-full '>Company Address</label>
                                <input 
                                  className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                //   placeholder="City" 
                                  name="company_address"
                                   
                                  defaultValue={partnerDetails?.company_address} />
                               
                        </div>
                        <button className='py-2 px-4 rounded-md bg-purple text-white mt-10'>Update</button>

                    </form>

                    <form onSubmit={handleRegistrationCertificate} ref={formEl} >
          <div className='mt-10'>
              <p className='font-medium text-sm mb-2'>Registration Certificate</p>
              <label className='inline-block' htmlFor="file-input">
                <img src={partnerDetails?.registration_certificate} width={130} height={130} />

              </label>
              <input className='hidden' id='file-input' name='file-input' type="file" />
          </div>
          <button className='p-2 rounded-md bg-purple text-white mt-20'>Upload</button>

</form>

                    <form onSubmit={handleRegistrationDocument} ref={formEl} >
          <div className='mt-10'>
              <p className='font-medium text-sm mb-2'>Registration Document</p>
              <label className='inline-block' htmlFor="file-input">
                <img src={partnerDetails?.registration_document} width={130} height={130} />

              </label>
              <input className='hidden' id='file-input' name='file-input' type="file" />
          </div>
          <button className='p-2 rounded-md bg-purple text-white mt-20'>Upload</button>

</form>

                    <form className='mt-10' >
                    <span >
                                <label className='block'>Point Threshold</label>
                                <input 
                                    className="p-3 text-xs text-slate-400 border border-solid border-slate-400  mt-2 outline-none  rounded-md" 
                                    type="number" 
                                    placeholder="2000" 
                                    name="points_threshold" />
                            </span>

                        <button className='ml-5 py-2 px-4 rounded-md bg-purple text-white'>Update</button>


                    </form>
            </div>
            {/* <button className='p-2 rounded-md bg-purple text-white mt-20'>Update Profile</button> */}
        </div>

        {false &&(
            <AddToken/>
        )}

{successNotification&&<Congratulations 
        lead={notification?.message}
        show={successNotification}
        onClose={()=>setSuccessNotification(false)}  />}
    
    {errorNotification&& <Error 
        lead={notification?.message} 
        sub={notification?.data?.data} 
        show={errorNotification}
        onClose={()=>setErrorNotification(false)} />}
    </div>
  )
}

export default PartnersBusinessSettings
