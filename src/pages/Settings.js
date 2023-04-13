import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Screen from '../components/Screen';
import { useState, useRef, useEffect } from "react";
import AccountProfile from "./settings-tabs/AccountProfile";
import CompanyProfile from "./settings-tabs/CompanyProfile";
import ApiPricing from "./settings-tabs/ApiPricing";
import ApiKeys from "./settings-tabs/ApiKeys";
import { Partner, PartnerAddLoyaltyPoints, PartnerProofProfilePhoto, PartnerUploadPhoto } from "../config/apiCalls";
import { useNavigate } from "react-router-dom";
import Congratulations from "../components/modals/Congratulations";
import Error from "../components/modals/Error";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
export default function Settings(){
    let navigate = useNavigate()

    const storage = getStorage()

    const [tab, setTab] = useState("accountProfile");
    
    const [partnerDetails, setPartnerDetails] = useState()

    const formEl = useRef()

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
        const response = await PartnerAddLoyaltyPoints(loyaltyPId.toUpperCase(), loyaltyPoints)
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
        const response = await PartnerAddLoyaltyPoints(loyaltyPId.toUpperCase(), loyaltyPoints)
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
        console.log(el);
        
        let lastDot = el.name.lastIndexOf('.')
        let ext = el.name.substring(lastDot + 1) 
        let response = await PartnerProofProfilePhoto(partnerDetails?.partner_unique_id)
        console.log(response);
        const filename = response.filename.data[0].photo
        console.log(filename);
        
        const imagePath = "partners/"+filename + "." + ext;
        const sotrageRef = ref(storage, imagePath )
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
                    await setProfileUpload(profilePhoto, imagePath)
                });
              
            }
        )
    }

    const setProfileUpload = async(profilePhoto, imagePath) =>{
       const response = await PartnerUploadPhoto(profilePhoto, imagePath)
        
        console.log(response)
        setNotification(response)

        if(response.success){
            setSuccessNotification(prev=>true)

        }else{
            setErrorNotification(prev=>true)
        }
    }

    async function getPartnerDetails (){
        const response = await Partner()
        setPartnerDetails(response.data)
    }

    useEffect(()=>{
        getPartnerDetails();
    },[])
    return(
        <>
        <Screen aside="false" navbar="false">
            <Content>
                <Navbar makeHidden placeholder="Search something..." />
                <section className="xui-bdr-w-1 xui-bdr-fade xui-bdr-s-solid xui-pt-half xui-pb-1 xui-px-1 xui-font-sz-85 psc-tabs-holder">
                    <div onClick={() => setTab("accountProfile")} className={"xui-cursor-pointer xui-py-1 xui-px-half es-tab-card " + (tab === "accountProfile" ? "active" : "")}>
                        <span>Account Profile</span>
                    </div>
                    <div onClick={() => setTab("companyProfile")} className={"xui-cursor-pointer xui-py-1 xui-px-half es-tab-card " + (tab === "companyProfile" ? "active" : "")}>
                        <span>Company Profile</span>
                    </div>
                </section>
                <section className="xui-py-2">
                    {tab === "accountProfile" && <AccountProfile partnerDetails={partnerDetails} formElement={formEl} submit={handleProfilePictureUpdate}/>}
                    {tab === "companyProfile" && <CompanyProfile partnerDetails={partnerDetails}  />}
                </section>
            </Content>

            <Congratulations 
        lead={notification?.message}
        show={successNotification}
        onClose={()=>setSuccessNotification(false)}  />
    
    <Error 
        lead={notification?.message} 
        sub={notification?.data?.data} 
        show={errorNotification}
        onClose={()=>setErrorNotification(false)} />
        </Screen>
        </>
    );
}