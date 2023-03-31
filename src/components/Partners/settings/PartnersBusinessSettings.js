import React, { useReducer, useRef, useState, useEffect } from 'react'
import RightBar from '../RightBar'
import SideBar from '../SideBar'
import avatar from '../assets/Profile-setting-avatar.png'
import AddToken from '../modal/AddToken'
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav'
import UsePartnerDetails from '../context/partnerDetails.context'
import { PartnerComplianceCertificate, PartnerComplianceDetails, PartnerComplianceDocument, PartnerProofComplianceDocument, PartnerProofProfilePhoto, PartnerUpdateThreshold, PartnerUploadPhoto } from '../config/apiCalls'
import jsCookie from 'js-cookie'
import Congratulations from '../modal/Congratulations'
import Error from '../modal/Error'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"


function PartnersBusinessSettings() {
    const storage = getStorage()
    let navigate = useNavigate()
    
    const formEl = useRef()
    const formElCertificate = useRef()
    const formElDocument = useRef()
    
    const [partnerDetails, refresh] = UsePartnerDetails()
    console.log(partnerDetails);
    const [jwt, setJwt] = useState(jsCookie.get('jwt'))
    const [showMenu, setShowMenu] = useState(false)
    const [thresholdPoint, setThresholdPoint] = useState(0)
    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")

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
        // updates the state to the fetch details 
      const el = formEl?.current?.elements
      for(let i=0; i<el?.length; i++){
          dispatch({type: el[i].name, payload: el[i].value})
        }
    }
    const handleUpdateBusinessDetails = async(e)=>{
        e.preventDefault()
        const response = await PartnerComplianceDetails(jwt, state)
        refresh()
        if(response.success){
            setNotification(response)
            setSuccessNotification(true)
        }else{
            setNotification(response)
            setErrorNotification(true)
        }   
    }
    const handleUpdateThreshold = async(e)=>{
        e.preventDefault()
        const response = await PartnerUpdateThreshold(jwt, thresholdPoint)
        refresh()
        
        setNotification(response)
        if(response.success){
            setSuccessNotification(true)
        }else{
            setErrorNotification(true)
        }
    }
    const handleRegistrationCertificate =async(e)=>{
        e.preventDefault()
        let profilePhoto = ""

        const el = formElCertificate?.current?.elements[0].files[0]
        console.log(el);
        let response = await PartnerProofComplianceDocument(jwt, partnerDetails.partner_unique_id)
        console.log(response);
        const filename = response.filename.data[0].registration_certificate
        console.log(filename);
        
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
                    console.log(profilePhoto);
                    await setRegistrationCertificateUpload(profilePhoto)
                });
            }
        )
    }
    const setRegistrationCertificateUpload = async(profilePhoto) =>{
       const response = await PartnerComplianceCertificate(jwt, profilePhoto)
       console.log(response)

       setNotification(response)
        if(response.success){
            setSuccessNotification(prev=>true)
        refresh()
        }else{
            setErrorNotification(prev=>true)
        }
    }
    //works
    const handleRegistrationDocument =async(e)=>{
        e.preventDefault()
        let profilePhoto = ""
        
        const el = formElDocument?.current?.elements[0].files[0]
        let response = await PartnerProofComplianceDocument(jwt, partnerDetails.partner_unique_id)
        const filename = response.filename.data[1].registration_document
        
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
                });
            }
        )
    }

    const setRegistrationDocumentUpload = async(profilePhoto) =>{
       const response = await PartnerComplianceDocument(jwt, profilePhoto)
       setNotification(response)
        if(response.success){
            setSuccessNotification(prev=>true)
        refresh()
        }else{
            setErrorNotification(prev=>true)
        }
    }
    useEffect(()=>{
        handleLoop()
    },[partnerDetails])

  return (
    <div>
      <SideBar show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
      <RightBar/>
      <div  className='p-5 md:pl-14 md:ml-[250px] lg:mr-[250px]'>
        <Nav lead={"Settings"} action={(e)=>setShowMenu(prev=>!prev)} />
            <div>
                <img width={58} height={58} src={partnerDetails?.photo} />
            </div>
            <div>
                <p className="font-bold">{partnerDetails?.name}</p>
                <p className='text-center mt-2 text-[10px]'>Profile URL: <a href='#' className='underline'>{partnerDetails?.access_url}</a> - Click to copy</p>
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
                            required
                            minLength={3}
                            maxLength={150}
                            
                            defaultValue={partnerDetails?.company_name} 
                                />

                            
                    </div>

                    <div className='flex items-center flex-wrap gap-3 mt-2'>
                            <label className='basis-full '>Company Email</label>
                            <input 
                                className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                type="email" 
                                name="company_email"
                                required
                                
                                defaultValue={partnerDetails?.company_email} />
                            

                    </div>
                    <div className='flex items-center flex-wrap gap-3'>
                            <label className='basis-full '>Company RC Number</label>
                            <input 
                                className="p-2  basis-8/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                type="text" 
                                required
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
                                required
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
                                required
                                minLength={3}
                                maxLength={200}
                                name="company_address"
                                defaultValue={partnerDetails?.company_address} />
                            
                    </div>
                    <button className='py-2 px-4 rounded-md bg-purple text-white mt-10'>Update</button>

                    </form>

                    <form onSubmit={handleRegistrationCertificate} ref={formElCertificate} >
          <div className='mt-10'>
              <p className='font-medium text-sm mb-2'>Registration Certificate</p>
              <label className='inline-block' htmlFor="certificate-input">
                <img src={partnerDetails?.registration_certificate} width={130} height={130} />

              </label>
              <input 
                className='hidden' 
                id='certificate-input' 
                name='certificate-input' 
                type="file"
                required />
          </div>
          <button className='p-2 rounded-md bg-purple text-white mt-20'>Upload</button>

</form>

                    <form onSubmit={handleRegistrationDocument} ref={formElDocument} >
          <div className='mt-10'>
              <p className='font-medium text-sm mb-2'>Registration Document</p>
              <label className='inline-block' htmlFor="document-input">
                <img src={partnerDetails?.registration_document} width={130} height={130} />

              </label>
              <input 
                className='hidden' 
                id='document-input' 
                name='document-input' 
                type="file"
                required />
          </div>
          <button className='p-2 rounded-md bg-purple text-white mt-20'>Upload</button>

</form>

                    <form className='mt-10' onSubmit={handleUpdateThreshold} >
                    <span >
                                <label className='block'>Point Threshold</label>
                                <input 
                                    className="p-3 text-xs text-slate-400 border border-solid border-slate-400  mt-2 outline-none  rounded-md" 
                                    type="number" 
                                    onChange={(e)=>setThresholdPoint(e.target.value)}
                                    placeholder="2000" 
                                    min={1}
                                    name="points_threshold"
                                    required />
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
