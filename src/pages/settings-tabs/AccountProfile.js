import { useNavigate } from "react-router-dom";
import GalleryAdd from "../../assets/images/gallery-add.png";
import Check from "../../icons/Check";
import { useReducer, useRef, useState } from "react";
import { PartnerUpdateEmail, PartnerUpdateName, PartnerUpdateThreshold } from "../../config/apiCalls";
import Congratulations from "../../components/modals/Congratulations";
import Error from "../../components/modals/Error";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";

export default function AccountProfile({submit, formElement, partnerDetails, uploadingProfilePhoto, setUploadingProfilePhoto, progress}){
    const navigate = useNavigate();
  const formEl = useRef();


  const [successNotification, setSuccessNotification] = useState();
    const [errorNotification, setErrorNotification] = useState();
    const [notification, setNotification] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");

  const handleUpdateEmail =async(e) =>{
    e.preventDefault();
    const email = e.target.elements[0].value;
    const response =  await PartnerUpdateEmail(email);
    
    console.log(response);

    if(response.success){
      setSuccessNotification(prev=>true);
  }else{
      setErrorNotification(prev=>true);
  }
  setNotification(response);

    // const response = await 
  }
  const handleUpdateThreshold = async(e)=>{
    e.preventDefault();
    const point_threshold = parseInt(e.target.elements[0].value);
    const response = await PartnerUpdateThreshold(point_threshold );
    if(response.success){
      setSuccessNotification(prev=>true);
  }else{
      setErrorNotification(prev=>true);
  }
  setNotification(response);
  }


  const signupForm ={
    name: "",
    city: "",
    state: "",
    country: "",
}
const SIGNUPACTION ={
    NAME: "name",
    CITY: "city",
    STATE: "state",
    COUNTRY: "country"
}
const reducer=(state, action)=>{
    const {type, payload} = action;
    switch(type){
        case SIGNUPACTION.NAME:
          console.log(state);
            return {...state, name: payload};
        case SIGNUPACTION.CITY:
            return {...state, city: payload};
        case SIGNUPACTION.STATE:
            return {...state, state: payload};
        case SIGNUPACTION.COUNTRY:
            return {...state, country: payload};
        default:
            return state;
    }
}
const [signupData, dispatch] = useReducer(reducer, signupForm);

const handleLoop= (e)=>{
  const el = formEl.current.elements;
    for(let i=0; i<el?.length; i++){
      dispatch({type: el[i].name, payload: el[i].value});
  }
  console.log(signupData);
}
const handleUpdateBusinessDetails = async(e)=>{
    e.preventDefault();

    
  console.log(signupData);
    const response = await PartnerUpdateName(signupData);
    console.log(response);

    

    if(response.success){
        setNotification(response);
        setSuccessNotification(true);
        
      }else{
        setNotification(response);
        setErrorNotification(true);
      }
}
    const handleSelectProfilePhoto = (e) =>{
        const el = e.target.files[0];
        setSelectedProfilePhoto("");
        setSelectedProfilePhoto(el.name)
    }
    return(
        <>
        <form onSubmit={submit} ref={formElement} className="xui-form xui-mt--1">
            <div className="xui-form-box">
                <label for="imageFile">
                    <span className="xui-d-inline-block">Your Profile Picture</span>
                    <div className="xui-opacity-6 xui-w-150 xui-h-150 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                        <img className="xui-img-40" src={partnerDetails?.photo} alt="" />
                        <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                    </div>
                </label>
                <input onChange={handleSelectProfilePhoto} type={"file"} id="imageFile" style={{display:"none"}} required />
                <div>
                    {selectedProfilePhoto && <p className="xui-text-cente xui-mt-half">Selected File Name: <span className="xui-font-sz-80 xui-opacity-5 xui-mt-half">{selectedProfilePhoto}</span></p>}
                </div>

                <div className="xui-mt-1 xui-d-flex">
                    <button disabled={uploadingProfilePhoto} className="xui-btn psc-btn-blue xui-font-sz-80">{uploadingProfilePhoto?(<span>Uploading {Math.round(progress)}% <TailSpin speed={3} height={14}/></span>): "Save Changes"}</button>
                </div>
            </div>
        </form>
        <form onSubmit={handleUpdateEmail} className="xui-form xui-mt--1">
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Email Address</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input 
                        style={{width: "calc(100% - 100px)"}} 
                        type="email"
                        name="email"
                        defaultValue={partnerDetails?.email}
                        required />
                    <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div>
                </div>
            </div>
        </form>
        
        <form onSubmit={handleUpdateThreshold} className="xui-form xui-mt--1">
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Point Threshold</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input 
                        style={{width: "calc(100% - 100px)"}} 
                        type="number"
                        min={1}
                        name="point_threshold"
                        defaultValue={partnerDetails?.point_threshold}
                        required />
                    <button
                        style={
                            {
                                outline: "none",
                                border: "0px"
                            }
                        } className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </button>
                </div>
            </div>
        </form>
        <form onChange={handleLoop} className="xui-form xui-mt--1" ref={formEl} onSubmit={handleUpdateBusinessDetails}>
            <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Business name</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input 
                        style={{width: "calc(100% - 100px)"}} 
                        type={"text"}
                        name="name"
                        minLength={3}
                        maxLength={50}
                        defaultValue={partnerDetails?.name} />
                    <button
                        style={
                            {
                                outline: "none",
                                border: "0px"
                            }
                        } className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </button>
                </div>
            </div>
            <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>City </label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input 
                        style={{width: "calc(100% - 100px)"}} 
                        type={"text"}
                        name="city"
                        disabled
                        defaultValue={partnerDetails?.city} />
                    {/* <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div> */}
                </div>
            </div>
            <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>State</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input 
                        style={{width: "calc(100% - 100px)"}} 
                        type={"text"}
                        name="state"
                        disabled
                        defaultValue={partnerDetails?.state} />
                    {/* <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div> */}
                </div>
            </div>
            <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Country</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input 
                        style={{width: "calc(100% - 100px)"}} 
                        type={"text"}
                        name="country"
                        disabled
                        defaultValue={partnerDetails?.country} />
                    {/* <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div> */}
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
    </>
    );
}