// import Filter from '../icons/Filter';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Navbar from '../components/Navbar';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import Arrowright from '../icons/Arrowright';
import {useState, UseEffect, useEffect, useRef} from "react"
import { Partner, PartnerActivateUser, PartnerAddLoyaltyPoints, PartnerMetrics, PartnerOffers } from '../config/apiCalls';
import SideIssueLoyaltyPoints from '../components/SideIssueLoyaltyPoints';
import SideCheckoutLoyaltyPoints from '../components/SideCheckoutLoyaltyPoints';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import Congratulations from '../components/modals/Congratulations';
import Error from '../components/modals/Error';
import Offers from '../icons/Tag';
import Team from '../icons/Team';
import Key from '../icons/Key';
import "../assets/css/alt.css"
import PartnersUpgradeAccount from '../components/modals/PartnersUpgradeAccount';

export default function Dashboard(){
     const [loading, setLoading] = useState(false);
     const [pId, setPId]= useState();
     const [partnerDetails, setPartnerDetails] = useState();
     const [partnerMetrics, setPartnerMetrics] = useState("");
     const [offerId, setOfferId] = useState();
     const [offers, setOffers] = useState();
     const [successNotification, setSuccessNotification] = useState();
     const [errorNotification, setErrorNotification] = useState();
     const [upgradeModal, setUpgradeModal] = useState(false);
     const [notification, setNotification] = useState("");
     const [menu, setMenu] = useState(false);

     const [loyalty, setLoyalty]= useState(false);
     const [checkout, setCheckout] = useState(false);

     const [loyaltyPId, setLoyaltyPId] = useState("");
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [loyaltyLoading, setLoyaltyLoading] = useState(false);
    const [checkoutPId, setCheckoutPId] = useState(false);
    const [checkoutPoints, setCheckoutPoints] = useState(0);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

     const handleLoyalty=()=>{
        setCheckout(false)
        setLoyalty(prev=>!prev)
    }

    const handleCheckout=()=>{
        setLoyalty(false)
        setCheckout(prev=>!prev)
    }
 
     async function getPartnerOffers (){
         const response = await PartnerOffers();
         setOffers(response?.data?.rows);
     }
     const handleActivateUser =async(e)=>{
         e.preventDefault();
         setLoading(true);
         const response = await PartnerActivateUser(pId, offerId);
         console.log(response);
         setLoading(false);
         
         if(response.success){
             setSuccessNotification(prev=>true);
         }else{
             setErrorNotification(prev=>true);
         }
         setNotification(response);
     }
     const handleAccountUpgrade = async (e)=>{
         e.preventDefault();
         setUpgradeModal(false);
     }
 
     async function getPartnerMetrics (){
         const response = await PartnerMetrics();
         console.log(response.data);
         setPartnerMetrics(response?.data);
     }
     async function getPartnerDetails (){
         const response = await Partner();
         setPartnerDetails(response.data);
     }

     const elementRef = useRef(null);
  const [copiedText, setCopiedText] = useState('');

  function handleClick() {
    if (elementRef.current) {
      const textToCopy = elementRef.current.textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopiedText(textToCopy);
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
        });
    }
  }

  const handleIssueLoyalty = async(e)=>{
    e.preventDefault();

    setLoyaltyLoading(true);
    const response = await PartnerAddLoyaltyPoints(loyaltyPId, parseInt(loyaltyPoints))
    .finally(e=>setLoyaltyLoading(false));

    if(response.success){
        setSuccessNotification(prev=>true);
    }else{
        setErrorNotification(prev=>true);
    }
    setNotification(response);
}
const handleCheckoutLoyalty = async(e)=>{
    e.preventDefault();
    setLoyaltyLoading(true);
    const response = await PartnerAddLoyaltyPoints(loyaltyPId, loyaltyPoints);
    if(response.success){
        setSuccessNotification(prev=>true);
    }else{
        setErrorNotification(prev=>true);
    }
    setNotification(response)
    .finally(e=>setLoyaltyLoading(false));
}

     useEffect(()=>{
         getPartnerDetails();
         getPartnerMetrics();
         getPartnerOffers();
     },[])
    return(
        <>
        <Screen aside="true" navbar="false">
            <Content>
                <Navbar placeholder="Search something..." makeHidden={true} />
                <section className='xui-mb-3'>
                <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-lg-grid-gap-2'>
                    <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                    <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                        {/* <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics?.total_general_users}</h3> */}
                        <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics?.total_partner_users}</h3>
                        <span className='xui-font-sz-90'>Your users</span>
                    </div>
                    </div>
                    <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                    <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                        <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics?.total_general_users}</h3>
                        {/* <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics?.total_partner_users}</h3> */}
                        <span className='xui-font-sz-90'>Passcoder Total Users</span>
                    </div>
                    </div>
                </div>
                <div className='xui-mt-1-half xui-text-center'>
                    <p className='xui-font-sz-80'><span className='xui-opacity-5'>Profile URL: </span><span ref={elementRef} className='xui-opacity-5 xui-font-w-bold'>{partnerDetails?.access_url.slice(8)}</span> - <span onClick={handleClick} className='xui-cursor-pointer psc-text'>Click to copy</span></p>
                </div>
                </section>
                <section className=''>
                    <div className='xui-text-center'>
                        <h1 className='xui-font-sz-180'>Verify User</h1>
                        <form onSubmit={handleActivateUser} className='xui-form xui-max-w-450 xui-mx-auto'>
                            <div className='xui-form-box xui-max-w-300 xui-mx-auto'>
                                <select 
                                    disabled={offers?.length === undefined || loading? true: false} 
                                    required 
                                    onChange={(e)=>setOfferId(e.target.options[e.target.selectedIndex].getAttribute("data-unique"))} 
                                    className='xui-bdr-rad-half'>
                                    <option value={"Passcoder offer"}>{offers?.length === undefined? "No offer Available": "Passcoder Offer"}</option>
                                    {offers?.map((offer)=>{
                                        return <option data-unique={offer.unique_id} key={offers?.offer_unique_id}>{offer?.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='xui-form-box'>
                                <p className='xui-opacity-5 xui-font-sz-95 xui-w-fluid-70 xui-mx-auto xui-my-3'>Input the user’s Passcoder ID to verify their account for this offer</p>
                            </div>
                            <div className='xui-form-box'>
                                <input
                                    onChange={(e)=>setPId(e.target.value)} 
                                    type="text"
                                    name='pid'
                                    required
                                    minLength={6}
                                    maxLength={8}
                                    placeholder='PID'
                                    disabled={offers?.length === undefined || loading? true: false} 
                                    className='xui-bdr-rad-half'/>
                            </div>
                            <div className='xui-form-box'>
                            <button 
                                disabled={offers?.length === undefined || loading? true: false}
                                className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Verify user</span>
                                {!loading&&<Arrowright width="12" height="12" />}
                                {loading && <TailSpin speed={3} height={24} />}
                                
                            </button>
                            </div>
                            <span className='xui-opacity-4 xui-font-sz-80 xui-font-w-700 xui-open-sidebar'>Click to open right sidebar (take if off later)</span>
                        </form>

                        <div
                            className='upgrade-container '>
            <div>
                <p>With Passcoder Premium, you get access <br />to the following:</p>
                <div >
                    <span ><Offers /> Offers</span>
                    <span ><Team /> Loyalties</span>
                    <span ><Key /> Tokens</span>
                </div>
            </div>
                <button xui-modal-open="upgrade"
                    onClick={()=>setUpgradeModal(e=>!e)}
                    >
                        Upgrade to Premium
                </button>
        </div>
                    </div>
                </section>
            </Content>
            {upgradeModal && <PartnersUpgradeAccount
        show={upgradeModal}
        handleSubmit={handleAccountUpgrade} /> }
            <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
                <p className='xui-opacity-5 xui-font-sz-90 xui-line-height-1-half xui-w-fluid-80'>Issue loyalty points directly to your new and existing Passcoder users.</p>
                <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-mt-1-half'>
                    <button onClick={handleLoyalty} className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Loyalty</button>
                    <button onClick={handleCheckout} className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Check out</button>
                </div>
                {loyalty 
                &&<SideIssueLoyaltyPoints
                    submit={handleIssueLoyalty}
                    setLoyaltyPId={setLoyaltyPId}
                    loyaltyLoading={loyaltyLoading}
                    setLoyaltyPoints={setLoyaltyPoints} />}

                {checkout 
                    &&<SideCheckoutLoyaltyPoints
                        submit={handleCheckoutLoyalty}
                        setCheckoutPId={setCheckoutPId}
                        setCheckoutPoints={setCheckoutPoints}
                        checkoutLoading={checkoutLoading} />}
                <div className='xui-mt-5'>
                    <div className='xui-d-flex xui-flex-ai-baseline xui-flex-jc-space-between'>
                        <div className='xui-pl-1'>
                            <img className='xui-img-100' src={Boxes} alt='boxes' />
                        </div>
                        <div className='xui-pr-1'>
                            <img className='xui-img-100' src={FlowerPlant} alt='flower plant' />
                        </div>
                    </div>
                    <div className='psc-bg-light-blue-ii xui-px-1 xui-pt-5 xui-pb-1 xui-mt--4'>
                        <h4 className='xui-font-sz-90 xui-mt-half'>Earn more with offers</h4>
                        <p className='xui-opacity-4 xui-font-sz-85 xui-line-height-1-half xui-mt-half xui-w-fluid-90'>Premium partners can earn more and attract more customers with amazing offers. Create yours now.</p>
                        <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85 xui-mt-2'>Create an offer</button>
                    </div>
                </div>
            </div>
        </Screen>
        {errorNotification && <Error 
    lead={notification?.message} 
    sub={notification?.data?.data}
    show={errorNotification}
    onClose={()=>setErrorNotification(false)} 
    />}
    {successNotification && <Congratulations 
    lead={notification?.message} 
    show={successNotification}
    onClose={()=>setSuccessNotification(false)}
  />}


        </>
    );
}