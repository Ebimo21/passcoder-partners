import React, { useRef, useState } from 'react'
import "./assets/style.css"
import SideBar from './SideBar'
import RightBar from './RightBar'
import AccountSetting from './settings/AccountSetting'
import { useNavigate } from 'react-router-dom';
import { PartnerAddLoyaltyPoints, PartnerProofProfilePhoto, PartnerUploadPhoto } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Nav from './Nav'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import UsePartnerDetails from './context/partnerDetails.context'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'


function PartnersSetting() {
    const storage = getStorage()
    
    const [partnerDetails, setRefresh] =  UsePartnerDetails()

    let navigate = useNavigate()
    
    const formEl = useRef()

    const [jwt, setJwt] = useState(jsCookie.get("jwt"))
    const [loyaltyLoading, setLoyaltyLoading] = useState(false)
    const [loyaltyPId, setLoyaltyPId] = useState("")
    const [loyaltyPoints, setLoyaltyPoints] = useState(0)
    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")
    const [checkoutPId, setCheckoutPId] = useState(false)
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    const [showMenu, setShowMenu] = useState(false)


    const handleIssueLoyalty = async(e)=>{
        e.preventDefault()

        setLoyaltyLoading(true)
        const response = await PartnerAddLoyaltyPoints(jwt, loyaltyPId, loyaltyPoints)
        .finally(e=>setLoyaltyLoading(false))

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }

    const handleCheckoutLoyalty = async(e)=>{
        e.preventDefault()

        setLoyaltyLoading(true)
        const response = await PartnerAddLoyaltyPoints(jwt, loyaltyPId, loyaltyPoints)
        .finally(e=>setLoyaltyLoading(false))

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }

    const handleProfilePictureUpdate =async(e)=>{
        e.preventDefault()
        let profilePhoto = ""

        const el = formEl?.current?.elements[0].files[0]
        let response = await PartnerProofProfilePhoto(jwt, partnerDetails?.partner_unique_id)
        console.log(response);
        const filename = response.filename.data[0].photo
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
                    await setProfileUpload(profilePhoto)
                });
              
            }
        )
    }

    const setProfileUpload = async(profilePhoto) =>{
       const response = await PartnerUploadPhoto(jwt, profilePhoto)
        
        console.log(response)
        setNotification(response)

        if(response.success){
            setSuccessNotification(prev=>true)

        }else{
            setErrorNotification(prev=>true)
        }
    }
  return (
    <div>
      <SideBar partnerDetails={partnerDetails} show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
      <RightBar 
        handleIssueLoyalty={handleIssueLoyalty}
        loyaltyLoading={loyaltyLoading}
        setLoyaltyPId={setLoyaltyPId}
        setLoyaltyPoints={setLoyaltyPoints}
        handleCheckoutLoyalty={handleCheckoutLoyalty}
        setCheckoutPId={setCheckoutPId}
        checkoutLoading={checkoutLoading}/>
      <div className='p-5 md:pl-14 md:ml-[250px] lg:mr-[250px]'>
        <Nav lead={"Settings"} action={(e)=>setShowMenu(prev=>!prev)} />
        
            <div>
                <img width={58} height={58} src={partnerDetails?.photo} />
            </div>
            <div>
                <p className="font-bold">{partnerDetails?.name}</p>
                {/* <p className='text-[10px]'>Digital ID: 1234567890</p> */}
                <p className='text-center mt-2 text-[10px]'>Profile URL: <a href='#' className='underline'>partners.passcoder.io/business-name</a> - Click to copy</p>
            </div>

            <div className='flex items-center gap-4 mt-5'>
                <span className='pb-2 border-b-2 border-b-solid border-b-purple text-purple' onClick={(event)=>{navigate('/partners-settings')}}>Account Setting </span>
                <span onClick={(event)=>{navigate('/partners-business-settings')}}>Business Setting </span>
            </div>

            <AccountSetting 
                refresh={setRefresh}
                formElement={formEl}
                partnerDetails={partnerDetails}
                submit={handleProfilePictureUpdate}/>
        </div>

        <Congratulations 
        lead={notification?.message}
        show={successNotification}
        onClose={()=>setSuccessNotification(false)}  />
    
    <Error 
        lead={notification?.message} 
        sub={notification?.data?.data} 
        show={errorNotification}
        onClose={()=>setErrorNotification(false)} />
    </div>
  )
}

export default PartnersSetting
