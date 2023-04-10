import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import React, {useState, useRef, useReducer, useEffect} from 'react';
import { PartnerActivateUser, PartnerAddLoyaltyPoints, PartnerAddOffer, PartnerDeleteOffer, PartnerOffers, PartnerUniqueOffer, PartnerUpdateOffer } from '../config/apiCalls';
import Congratulations from '../components/modals/Congratulations';
import Error from '../components/modals/Error';
import Screen from '../components/Screen';
import AddOffer from '../components/modals/AddOffer';
import EditOffer from '../components/modals/EditOffer';
import SideIssueLoyaltyPoints from '../components/SideIssueLoyaltyPoints';
import SideCheckoutLoyaltyPoints from '../components/SideCheckoutLoyaltyPoints';
import aside from '../assets/images/frame1.png'
import { BiNavigation } from 'react-icons/bi';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import Delete from '../icons/Delete';
import ConfirmDelete from '../components/modals/ConfirmDelete';


export default function Offers(){
    const formEl = useRef();

    const [offerToDelete, setOfferToDelete] = useState("");
    const [offerId, setOfferId] = useState();
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(false);
    const [editId, setEditId] = useState("");
    const [pId, setPId] = useState("");
    const [loyaltyPId, setLoyaltyPId] = useState("");
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [loyaltyLoading, setLoyaltyLoading] = useState(false);
    const [checkoutPId, setCheckoutPId] = useState(false);
    const [checkoutPoints, setCheckoutPoints] = useState(0);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [editOfferModal, setEditOfferModal] = useState(false);
    const [createOffermodal, setCreateOfferModal] = useState(false);
    const [successNotification, setSuccessNotification] = useState();
    const [errorNotification, setErrorNotification] = useState();
    const [notification, setNotification] = useState("");
    const [offers, setOffers] = useState();
    const [offer, setOffer] = useState();
    const [loyalty, setLoyalty]= useState(false);
    const [checkout, setCheckout] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    
    async function getPartnerOffers (){
        const response = await PartnerOffers();
        setOffers(response.data.rows);
    }
    const offerForm = {
        name: "",
        discount: 0,
        limit: 0,
        single: true,
        description: "",
        start: "",
        end: "",
        points: 0,
        star: 0,
    }
    const FORMACTION={
        NAME: "name",
        DISCOUNT: "discount",
        LIMIT: "limit",
        SINGLE: "false",
        DESCRIPTION: "description",
        START: "start",
        END: "end",
        POINTS: "points",
        STAR: "star",
        CLEAR: "clear"
    }
    const reducer =(state, action)=>{
        const {type, payload} = action;
        let newPayload;
        switch(type){
            case FORMACTION.NAME:
                return {...state, name: payload};
            case FORMACTION.DISCOUNT:
                return {...state, discount: parseInt(payload)};
            case FORMACTION.LIMIT:
                console.log(state);
                return {...state, limit: parseInt(payload)};
            case FORMACTION.SINGLE:
                return {...state, single: payload};
            case FORMACTION.DESCRIPTION:
                return {...state, description: payload};
            case FORMACTION.START:
                newPayload = payload.replace(/[T]/, " ");
                return {...state, start: newPayload};
            case FORMACTION.END:
                newPayload = payload.replace(/[T]/, " ");
                return {...state, end: newPayload};
            case FORMACTION.POINTS:
                return {...state, points: parseInt(payload)};
            case FORMACTION.STAR:
                return {...state, star: parseInt(payload)};
            case FORMACTION.CLEAR:
                return {...state, ...offerForm};
            default:
                return state;
        };
    };
    const [state, dispatch] = useReducer(reducer, offerForm );
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setCreateOfferModal(false);
        console.log(state);
        const response = await PartnerAddOffer(state);

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);
        dispatch({type: FORMACTION.CLEAR});

    
    }

    const handleCallbackUpdate = async(e) =>{
       const response = await PartnerUpdateOffer(editId, state);

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);
        setEditOfferModal(false);
        dispatch({type: FORMACTION.CLEAR});

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
        setCheckoutLoading(true);
        const response = await PartnerAddLoyaltyPoints(loyaltyPId, loyaltyPoints)
        .finally(e=>setCheckoutLoading(false));
        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response)
    }

    const handleOfferUpdate = (e, callback)=>{
        e.preventDefault();
        callback();
    }

    const handleDelete =async ()=>{
        setDeleteModal(false)
        const response = await PartnerDeleteOffer(offerToDelete);
        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);

    }

    useEffect(()=>{
        getPartnerOffers();
    },[]);

    useEffect(()=>{
        const getOffer = async() =>{
            const response = await PartnerUniqueOffer(editId);
            setOffer(response.data);
        }

        getOffer()
    },[editId]);

    useEffect(()=>{
        const updateState =()=>{
            const el = formEl?.current?.elements;
        
            for(let i=0; i<el?.length; i++)
                dispatch({type: el[i].name, payload: el[i].defaultValue});
        }

        updateState();
    }, [offer]);

    const addOfferBtnRef = useRef();

    useEffect(()=>{

        const handleCaptureAddOffers=()=>{
            setRender(prev=>!prev);
        }

        addOfferBtnRef.current?.addEventListener('click', handleCaptureAddOffers, false);
        // return ()=> addOfferBtnRef.current?.removeEventListener('click', handleCaptureAddOffers);
        

    }, [render]);

    const handleLoyalty=()=>{
        setCheckout(false)
        setLoyalty(prev=>!prev)
    }

    const handleCheckout=()=>{
        setLoyalty(false)
        setCheckout(prev=>!prev)
    }

    const handleActivateUser =async(e)=>{
        e.preventDefault()
        setLoading(true)
        const response = await PartnerActivateUser(pId, offerId)
        .finally(e=>setLoading(false))

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }
    return(
        <>
        <Screen aside="true" navbar="false">

        <Content>
        <Navbar placeholder="Search something..." />
            <p>Earn and attract more users to your business with offers. Create new offer, edit criteria and set eligibility standards.</p>
            <section className=''>
            <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Activities</h1>
                <div className='xui-d-inline-flex'>
                    <span className='xui-form-box' ref={addOfferBtnRef}><button xui-modal-open="addOffer" className='xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85' >Create Offers</button></span>
                </div>
            </div>
            <div style={{textAlign: "center"}} className='xui-table-responsive'>
                <table className='xui-table xui-font-sz-90'>
                <tr className=' xui-opacity-6'>
                    <th className='xui-min-w-20'>S/N</th>
                    <th className='xui-min-w-300 xui-text-left'>Name</th>
                    <th className='xui-min-w-200'>Discount Amount</th>
                    <th className='xui-min-w-100'>Type</th>
                    <th className='xui-min-w-100'>Points</th>
                    <th className='xui-min-w-100'>Stars</th>
                    <th className='xui-min-w-150'>Actions</th>
                </tr>
                {offers?.map((item, index)=>{
                    return (
                    <tr key={index} className=''>
                        <td className='xui-opacity-5'>
                        <div className='xui-d-inline-flex xui-flex-ai-center'>
                            {index+1}
                        </div>
                        </td>
                        <td className='xui-opacity-5 xui-text-left'>{item?.name}</td>
                        <td className='xui-opacity-5 xui-font-w-bold'>
                        <span>{item?.discount}</span>
                        </td>
                        <td className='xui-opacity-5 xui-font-w-bold'>
                        <span>{item?.single? "Single":"Multiple"}</span>
                        </td>
                        <td className='xui-opacity-5 xui-font-w-bold'>
                        <span>{item?.points}</span>
                        </td>
                        <td className='xui-opacity-5 xui-font-w-bold'>
                        <span>{item?.star}</span>
                        </td>
                        <td style={
                            {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }
                        }>
                            {/* <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span> */}
                            <span
                                data-offer={item?.unique_id} 
                                onClick={ (e)=>{setEditOfferModal(prev=>!prev); setEditId(e.target.getAttribute("data-offer")) }}
                                xui-modal-open="editOffer" 
                                className="xui-cursor-pointer psc-text xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85"
                                >Edit</span>
                            <span
                                data-offer={item?.unique_id} 
                                onClick={ (e)=>{ setOfferToDelete(item?.unique_id); setDeleteModal(prev=>!prev) }}
                                xui-modal-open="deleteOffer" 
                                className='xui-cursor-pointer xui-font-sz-90 psc-text'
                                ><Delete/></span>
                        </td>
                    </tr>
                    )})
                }
                </table>
            </div>
            <div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
                <div className='xui-d-inline-flex xui-flex-ai-center'>
                    <span>Rows per page:</span>
                    <select className='psc-select-rows-per-page xui-ml-half'>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className='xui-mx-1 xui-lg-mx-2'>
                    <span><span className='xui-font-w-bold'>11 - 20</span> of 194</span>
                </div>
                <div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
                    <div className='xui-mr-half xui-cursor-pointer'>
                        <Arrowleft width="18" height="18" />
                    </div>
                    <div className='xui-ml-half xui-cursor-pointer'>
                        <Arrowright width="18" height="18" />
                    </div>
                </div>
            </div>
            </section>
        </Content>

        {deleteModal&&<ConfirmDelete show={deleteModal} onClose={()=>setDeleteModal(false)} lead='Confirm Delete' deleted={handleDelete} />}
        
        {/* {render &&<Modal/>} */}
        {editOfferModal&& 
            <EditOffer 
                handleOfferUpdate={handleOfferUpdate} 
                handleCallbackUpdate={handleCallbackUpdate}
                dispatch={dispatch}
                FORMACTION={FORMACTION}
                id={editId}
                formElement={formEl}
                show={editOfferModal}  />}
        {render&&<AddOffer FORMACTION={FORMACTION} dispatch={dispatch} handleSubmit={handleSubmit} show={render}  />}
        <section className='xui-modal' xui-modal="viewMore">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <div className='xui-d-flex xui-flex-dir-column xui-lg-flex-dir-row'>
                    <div className='xui-w-200 xui-h-200 xui-bg-sz-cover xui-bg-pos-center' style={{backgroundImage:"url('https://images.unsplash.com/photo-1531475925016-6d33cb7c8344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWElMjBwb3J0cmFpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')"}}></div>
                    <div className='xui-pl-none xui-lg-pl-1 xui-mt-2 xui-lg-mt-none xui-text-uppercase xui-font-sz-90' style={{width: "calc(100% - 200px)"}}>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Firstname:</span> <span className='xui-font-w-bold'>Richard</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Middlename:</span> <span className='xui-font-w-bold'>Oyeinbrakemi</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Lastname:</span> <span className='xui-font-w-bold'>Gigi</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Gender:</span> <span className='xui-font-w-bold'>Male</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Date of birth:</span> <span className='xui-font-w-bold'>24th of July, 2001</span></p>
                    </div>
                </div>
                <hr className='xui-my-1' />
                <div className='xui-p-1 xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-d-flex xui-flex-ai-center'>
                    <div>
                        <p className='xui-font-w-bold xui-font-sz-80 xui-opacity-5'>NIN Slip &nbsp; 452838218</p>
                        <span className='xui-font-sz-70 xui-opacity-5 xui-d-inline-block xui-mt-half'>Issued: 2007</span>
                    </div>
                </div>
                <img className='xui-img-300 xui-mt-1' src='https://infomediang.com/wp-content/uploads/2021/01/Old-National-Identity-Card-nin-number.jpg' alt='' />
            </div>
        </section>
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
                <div>
                    <img src={aside} />
                <div className='bg-[#EDF0F6] p-2 text-sm'>
                    <h2 className='font-semibold text-[#273240]'>Verify User</h2>
                    <form onSubmit={handleActivateUser} className='xui-form xui-max-w-450 xui-mx-auto'>
                        <div className='xui-form-box xui-max-w-300 xui-mx-auto'>

                            <select
                                className='xui-bdr-rad-half'
                                onChange={(e)=>setOfferId(e.target.options[e.target.selectedIndex].getAttribute("data-unique"))}
                                required>
                                    <option>Passcoder Offer</option>
                                    {offers?.map((offer, index)=>{
                                        return <option data-unique={offer.unique_id} key={index}>{offer?.name}</option>
                                    })}
                            </select>
                        </div>
                        <p className='text-xs mt-1'>Input the User's PassCoder ID to verify their account for this offer</p>
                        <div className='xui-form-box'>
                        <input 
                            onChange={(e)=>setPId(e.target.value)}
                            type="text"
                            minLength={6} 
                            maxLength={8}
                            className='xui-bdr-rad-half'
                            placeholder='PID'
                            required />
                        </div>
                        <div className='xui-form-box'> 
                        <button 
                            
                            disabled={loading} 
                            className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85"
                            >Verify user 
                            {!loading&&<BiNavigation />} 
                            {loading && <TailSpin stroke='#fff' speed={3} height={14} />}
                        </button>
                        </div>
                    </form>

                </div>
            </div>
                </div>
            </div>

        <Congratulations
        lead={notification?.message} 
        show={successNotification} 
        onClose={()=>setSuccessNotification(false)}
        />
      <Error
        lead={notification?.message} 
        sub={notification?.data?.data} 
        show={errorNotification} 
        onClose={()=>setErrorNotification(false)} />
        </Screen>
        </>
    );
}