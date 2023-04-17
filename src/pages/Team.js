import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
// import Filter from '../icons/Filter';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import {useState, useRef, useReducer, useEffect} from "react"
import { PartnerAddToken, PartnerDeleteToken, PartnerGetTokens, PartnerUpdateTokenDetails } from '../config/apiCalls';
import Screen from '../components/Screen';
import EditToken from '../components/modals/EditToken';
import Congratulations from '../components/modals/Congratulations';
import Error from '../components/modals/Error';
import AddToken from '../components/modals/AddToken';
import Delete from '../icons/Delete';
import ConfirmDelete from '../components/modals/ConfirmDelete';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export default function Team(){
    const [render, setRender ] = useState(false)
    const formEl = useRef();
    const [addTokenModal, setAddTokenModal] = useState(false);
    const [editTokenModal, setEditTokenModal] = useState(false);
    const [successNotification, setSuccessNotification] = useState();
    const [errorNotification, setErrorNotification] = useState();
    const [notification, setNotification] = useState("");
    const [tokenId, setTokenId] = useState();
    const [editId, setEditId] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [tokens, setTokens] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(1);
    const [tokenLoading, setTokenLoading] = useState(true);

    const [ deleteModal, setDeleteModal] = useState();

    const handleCreateToken = async (e)=>{
        e.preventDefault();
        const response = await PartnerAddToken(state);
        setRender(false);
        setAddTokenModal(false);

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);

        dispatch({type: FORMACTION.CLEAR});

    }
    const getTokens = async()=>{
        setTokenLoading(true);
        const response = await PartnerGetTokens(page, rowsPerPage)
        .finally((res)=>setTokenLoading(false));

        console.log(response.data);
        setTokens(response.data.rows);
    }

    const FORMACTION={
        ALIAS: "alias",
        EXPIRATION: "expiration",
        VALID: "valid",
        CLEAR: "clear"
    }

    const initialState = {
        alias: "",
        expiration: 0,
        valid: true,
    }

    const reducer =(state, action)=>{
        const {type, payload} = action;
        let newPayload;
        switch(type){
            case FORMACTION.ALIAS:
                console.log(state);
                return {...state, alias: payload};
            case FORMACTION.EXPIRATION:
                console.log(payload);
                newPayload = payload.replace(/[T]/, " ");
                return {...state, expiration: newPayload};
            case FORMACTION.VALID:
                console.log(state);
                return {...state, valid: payload};
            case FORMACTION.CLEAR:
                return {...state, ...initialState};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [tokenToDelete, setTokenToDelete] = useState();
    const handleDeleteToken =async()=>{
        const response = await PartnerDeleteToken(tokenToDelete);
        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);
    }

    const handleUpdateToken = async(e)=>{
        e.preventDefault()
        const response = await PartnerUpdateTokenDetails(tokenId, editId, state);
        console.log(response);

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);
        setEditTokenModal(false);

        dispatch({type: FORMACTION.CLEAR});
    }

    const handleCallback = async(e, callback)=>{
        e.preventDefault();
        callback(e);
    }

    useEffect(()=>{
        getTokens();

    }, [notification]);

    const addTokenBtnRef = useRef();

    useEffect(()=>{

        const handleCaptureAddToken=()=>{
            setRender(prev=>!prev);
        }

        addTokenBtnRef.current?.addEventListener('click', handleCaptureAddToken, false);
        // return ()=> addOfferBtnRef.current?.removeEventListener('click', handleCaptureAddOffers);
        

    }, [render]);

    const handleSelectRows = async (e) =>{
        setTokenLoading(true);
        const row = e.target.value;
        setRowsPerPage(row);
        const response = await PartnerGetTokens(page, row)
        .finally((res)=>setTokenLoading(false));

        setTokens(response.data.rows)

    }

    const handleGetNextPage = async() =>{
        setTokenLoading(true);
        setPage(page=>page+1)
        console.log(page);
        const response = await PartnerGetTokens(page+1, rowsPerPage)
        .finally((res)=>setTokenLoading(false));

        setTokens(response.data.rows);
    }
    
    const handleGetPreviousPage = async() =>{
        setTokenLoading(true);
        setPage(page=>page-1)
        if(!page===1){
            setPage(page=>page-1)

        }
        const response = await PartnerGetTokens(page-1, rowsPerPage)
        .finally((res)=>setTokenLoading(false));

        setTokens(response.data.rows);
    }
    return(
        <>
        <Screen aside="true" navbar="false">
        <Content>
        <Navbar placeholder="Search something..." />
            <section className=''>
            <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Activities</h1>
                <div className='xui-d-inline-flex'>
                    <span ref={addTokenBtnRef}><button xui-modal-open="addToken" className='xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85' >Create Token</button></span>
                </div>
            </div>
            <div className='xui-table-responsive xui-text-center'>
                <table className='xui-table xui-font-sz-90'>
                <tr className='xui-opacity-6'>
                    <th className='xui-min-w-20'>S/N</th>
                    <th className='xui-min-w-300 xui-text-left'>Token Name</th>
                    <th className='xui-min-w-100'>Token</th>
                    <th className='xui-min-w-100'>Valid</th>
                    <th className='xui-min-w-200'>Expiration</th>
                    <th className='xui-min-w-150'>Actions</th>
                </tr>
                {!tokenLoading && tokens?.map((item, index)=>{
                    return(
                        <tr key={index} className=''>
                            <td className='xui-opacity-5'>
                            {index+1}
                            </td>
                            <td className='xui-opacity-5 xui-text-left'>{item?.alias}</td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.token?.slice(10)}</span>
                            </td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span  className={`${item?.valid? "xui-badge-success": ""} xui-badge xui-font-sz-80 xui-bdr-rad-half`}>{item?.valid?"Active": "Inactive"}</span>
                            </td>
                            <td className='xui-opacity-5'>
                            <span>{item?.expiration}</span>
                            </td>
                            <td style={
                            {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }
                        }>
                                <span
                                        data-tokenid={item?.token}
                                        data-uniqueid={item?.unique_id}
                                        onClick={(e)=>{setEditTokenModal(prev=>!prev); setEditId(e.target.getAttribute("data-uniqueid")); setTokenId(e.target.getAttribute("data-tokenid"))}}
                                                xui-modal-open="editToken" className='xui-cursor-pointer psc-text xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85'>Edit</span>

<span
                                data-offer={item?.unique_id} 
                                onClick={ (e)=>{ setTokenToDelete(item?.unique_id); setDeleteModal(prev=>!prev) }}
                                xui-modal-open="deleteOffer" className='xui-cursor-pointer xui-font-sz-90 psc-text'><Delete/></span>
                        </td>
                        </tr>
                    )
                })}
                </table>

                {tokenLoading && (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20px"}} className="xui-mt-2"><p>Tokens Loading... </p><TailSpin stroke='black'  color='#fff' /></div>
                )}
            </div>
            <div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
                <div className='xui-d-inline-flex xui-flex-ai-center'>
                    <span>Rows per page:</span>
                    <select onChange={handleSelectRows} className='psc-select-rows-per-page xui-ml-half'>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className='xui-mx-1 xui-lg-mx-2'>
                    <span><span className='xui-font-w-bold'>1</span> of 2</span>
                </div>
                <div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
                    <button disabled={page<2} onClick={handleGetPreviousPage} className='xui-mr-half xui-cursor-pointer'>
                        <Arrowleft width="18" height="18" />
                    </button>
                    <button onClick={handleGetNextPage} className='xui-ml-half xui-cursor-pointer'>
                        <Arrowright width="18" height="18" />
                    </button>
                </div>
            </div>
            </section>
        </Content>
        {deleteModal&&<ConfirmDelete show={deleteModal} onClose={()=>setDeleteModal(false)} lead='Confirm Delete' deleted={handleDeleteToken} />}

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
            <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
                <p className='xui-opacity-5 xui-font-sz-90 xui-line-height-1-half xui-w-fluid-80'>Issue loyalty points directly to your new and existing Passcoder users.</p>
                <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-mt-1-half'>
                    <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Loyalty</button>
                    <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Check out</button>
                </div>
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
        </section>
        <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
                <p className='xui-opacity-5 xui-font-sz-90 xui-line-height-1-half xui-w-fluid-80'>Issue loyalty points directly to your new and existing Passcoder users.</p>
                <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-mt-1-half'>
                    <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Loyalty</button>
                    <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Check out</button>
                </div>
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

            {render &&<AddToken 
        onClose={(e)=>setAddTokenModal(false)}
        show={render}
        submit={handleCreateToken}
        dispatch={dispatch}
        action = {FORMACTION}
      />}

            {editTokenModal&&<EditToken
        handleUpdate={handleCallback}
        handleCallbackUpdate={handleUpdateToken}
        dispatch={dispatch}
        FORMACTION={FORMACTION}
        id={tokenId}
        editId={editId}
        formElement={formEl}
        show={editTokenModal}
        onClose={()=>setEditTokenModal(false)}
       />}

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