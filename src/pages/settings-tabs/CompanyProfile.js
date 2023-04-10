import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import GalleryAdd from "../../assets/images/gallery-add.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import { PartnerComplianceCertificate, PartnerComplianceDetails, PartnerComplianceDocument, PartnerProofComplianceDocument, PartnerUpdateThreshold } from "../../config/apiCalls";
import Congratulations from "../../components/modals/Congratulations";
import Error from "../../components/modals/Error";

export default function MerchantProfile({partnerDetails}){
    const storage = getStorage()
    let navigate = useNavigate()
    
    const formEl = useRef()
    const formElCertificate = useRef()
    const formElDocument = useRef()
    
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
        const response = await PartnerComplianceDetails(state)
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
        const response = await PartnerUpdateThreshold(thresholdPoint)
        
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
        let lastDot = el.name.lastIndexOf('.')
        let ext = el.name.substring(lastDot + 1) 
        let response = await PartnerProofComplianceDocument(partnerDetails?.partner_unique_id)
        console.log(response);
        const filename = response.filename.data[0].registration_certificate
        console.log(filename);
        
        const imagePath = "partners/"+filename + "." + ext;

        const sotrageRef = ref(storage, imagePath)
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
                    await setRegistrationCertificateUpload(profilePhoto, imagePath)
                });
            }
        )
    }
    const setRegistrationCertificateUpload = async(profilePhoto, imagePath) =>{
       const response = await PartnerComplianceCertificate(profilePhoto, imagePath)
       console.log(response)

       setNotification(response)
        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
    }
    //works
    const handleRegistrationDocument =async(e)=>{
        e.preventDefault()
        let profilePhoto = ""
        
        const el = formElDocument?.current?.elements[0].files[0]
        let lastDot = el.name.lastIndexOf('.')
        let ext = el.name.substring(lastDot + 1) 
        let response = await PartnerProofComplianceDocument(partnerDetails?.partner_unique_id)
        const filename = response.filename.data[1].registration_document

        const imagePath = "partners/"+filename + "." + ext;
        
        const sotrageRef = ref(storage, imagePath)
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
                    await setRegistrationDocumentUpload(profilePhoto, imagePath)
                });
            }
        )
    }

    const setRegistrationDocumentUpload = async(profilePhoto, imagePath) =>{
       const response = await PartnerComplianceDocument(profilePhoto, imagePath)
       setNotification(response)
        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
    }
    useEffect(()=>{
        handleLoop()
    },[partnerDetails])
    
    return(
        <div>
        <form
            onChange={handleLoop} 
            ref={formEl} 
            onSubmit={handleUpdateBusinessDetails} 
            className="xui-form xui-mt--1">
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company Name</label>
                <input 
                    type={"text"}
                    defaultValue={partnerDetails?.company_name}
                    name="company_name"
                    required
                    minLength={3}
                    maxLength={150}  />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company Email</label>
                <input 
                    type="email" 
                    name="company_email"
                    required
                    defaultValue={partnerDetails?.company_email} />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company RC Number</label>
                <input 
                    type={"text"}
                    required
                    name="company_rc_number"                    
                    defaultValue={partnerDetails?.company_rc_number}
                     />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
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
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company Address</label>
                <input 
                    type="text" 
                    required
                    minLength={3}
                    maxLength={200}
                    name="company_address"
                    defaultValue={partnerDetails?.company_address} />
            </div>
            {/* <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Website URL</label>
                <input type={"text"} />
            </div> */}
            <div className="xui-d-flex">
                <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
            </div>
        </form>
        <form onSubmit={handleRegistrationCertificate} ref={formElCertificate}>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 xui-mt-3">
            <p>Registration Document</p>

                <label htmlFor="certificate-input">

                <div className="xui-opacity-6 xui-w-fluid-100 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                    <img className="xui-img-40" src={partnerDetails?.registration_certificate !== null ? partnerDetails?.registration_certificate: GalleryAdd} alt="" />
                    <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                </div>
                </label>
                <input 
                    style={
                        {
                            display: "none"
                        }
                    } 
                    id='certificate-input' 
                    name='certificate-input' 
                    type="file"
                    required />

                <p className="xui-text-center xui-font-sz-80 xui-opacity-5 xui-mt-half">Click to change picture</p>
                <div className="xui-mt-1 xui-d-flex">
                    <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                </div>
            </div>
        </form>
        <form onSubmit={handleRegistrationDocument} ref={formElDocument}>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 xui-mt-3">
                <p>Registration Certificate</p>
                <label htmlFor="document-input">

                <div className="xui-opacity-6 xui-w-fluid-100 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                    <img className="xui-img-40" src={partnerDetails?.registration_document !== null ? partnerDetails?.registration_document: GalleryAdd} alt="" />
                    <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                </div>
                </label>
                <input
                    style={
                        {
                            display: "none"
                        }
                    }
                    
                    className='hidden' 
                    id='document-input' 
                    name='document-input' 
                    type="file"
                    required />
                <p className="xui-text-center xui-font-sz-80 xui-opacity-5 xui-mt-half">Click to change picture</p>
                <div className="xui-mt-1 xui-d-flex">
                    <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                </div>
            </div>
        </form>
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
    );
}