
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import {useState, useEffect} from "react"
import { PartnerAddLoyaltyPoints, PartnerAddUserToAnnouncementList, PartnerCheckoutLoyaltyPoints, PartnerLoyaltyUsers } from '../config/apiCalls';
import Screen from '../components/Screen';
import { BiNavigation } from 'react-icons/bi';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import Error from '../components/modals/Error';
import Congratulations from '../components/modals/Congratulations';
import aside from '../assets/images/frame1.png'


export default function Loyalty(){
    // const [partnerDetails] = UsePartnerDetails()

    const [loyalty, setLoyalty]= useState(false);
    const [checkout, setCheckout] = useState(false);
    const [checkoutPId, setCheckoutPId] = useState(false);
    const [checkoutPoints, setCheckoutPoints] = useState(0);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [pId, setPId] = useState("");
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [issueLoyalty, setIssueLoyalty] = useState(false);
    const [checkoutLoyalty, setCheckoutLoyalty] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification]= useState(false);
    const [notification, setNotification] = useState("");
    const [users, setUsers]= useState([]);

    const [loyaltyLoading, setLoyaltyLoading] = useState(false);
    const [loyaltyPId, setLoyaltyPId] = useState("");
    const [pid, setPid] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(1)

    // const [loading, setLoading] = useState(false);


    const handleAddUserToList =async(e)=>{
        e.preventDefault();
        setLoading(true)
        const response = await PartnerAddUserToAnnouncementList(pid.toUpperCase())
        .finally(e=>setLoading(false))
        setNotification(response?.data);

        if(response.success)setSuccessNotification(true);
        else setErrorNotification(true);
    }
    
    async function getPartnerLoyaltyUsers (){
        const response = await PartnerLoyaltyUsers(page, rowsPerPage);
        setUsers(response?.data?.rows);
    }

    const handleIssue = async(e)=>{
        e.preventDefault();

        setLoading(true);
        const response = await PartnerAddLoyaltyPoints(pId.toUpperCase(), loyaltyPoints)
        .finally(e=>setLoading(false));

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);


    }
    const handleLoyaltyRightBar=()=>{
        setCheckout(false)
        setLoyalty(prev=>!prev)
    }

    const handleCheckoutRightBar=()=>{
        setLoyalty(false)
        setCheckout(prev=>!prev)
    }
    
    const handleCheckout = async(e)=>{
        e.preventDefault();

        setLoading(true);
        const response = await PartnerCheckoutLoyaltyPoints(pId.toUpperCase(), loyaltyPoints)
        .finally(e=>setLoading(false));

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response);


    }

    const handleIssueLoyalty = async(e)=>{
        e.preventDefault();
        setLoyaltyLoading(true);
        const response = await PartnerAddLoyaltyPoints(loyaltyPId.toUpperCase(), loyaltyPoints)
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
        const response = await PartnerCheckoutLoyaltyPoints(checkoutPId.toUpperCase(), checkoutPoints)
        .finally(e=>setCheckoutLoading(false));
        
        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setNotification(response)
        
    }

    
    
    useEffect(()=>{
        getPartnerLoyaltyUsers()
    }, []);

    const handleSelectRows = async (e) =>{

        const row = e.target.value;
        setRowsPerPage(row);
        const response = await PartnerLoyaltyUsers(page, row);
        setUsers(response.data.rows)

    }

    const handleGetNextPage = async() =>{
        setPage(page=>page+1)
        console.log(page);
        const response = await PartnerLoyaltyUsers(page+1, rowsPerPage);
        setUsers(response.data.rows);
    }
    
    const handleGetPreviousPage = async() =>{
        setPage(page=>page-1)
        if(!page===1){
            setPage(page=>page-1)

        }
        const response = await PartnerLoyaltyUsers(page-1, rowsPerPage);
        setUsers(response.data.rows);
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
                </div>
            </div>
            <div className='xui-table-responsive xui-text-center'>
                <table className='xui-table xui-font-sz-90'>
                <tr className='xui-opacity-6'>
                    <th className='xui-min-w-300 xui-text-left'>User</th>
                    <th className='xui-min-w-150'>Restrictions</th>
                    <th className='xui-min-w-100'>Points</th>
                    <th className='xui-min-w-200'>Date Authenticated</th>
                    <th className='xui-min-w-200'>Last Authenticated</th>
                    <th className='xui-min-w-150'>Actions</th>
                </tr>
                {users?.map((item, index)=>{
                    return (
                        <tr key={index} className=''>
                            <td className='xui-opacity-5 xui-text-left'>
                            <div className='xui-d-inline-flex xui-flex-ai-center'>
                                <p>{`${item?.user_data?.firstname + " " +item?.user_data?.pid}`}</p>
                            </div>
                            </td>
                            <td className='xui-opacity-5'>{item?.restricted?.toString()}</td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.points}</span>
                            </td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.updatedAt?.date}</span>
                            </td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.updatedAt?.date}</span>
                            </td>
                            <td style={
                                {
                                    textAlign: "center",
                                    wordWrap: "normal"
                                }
                            }>
                                <span
                                    style={
                                        {
                                            display: "flex",
                                            flexDirection: "column",
                                            
                                        }
                                    } className='flex flex-col items-center'>
                                    <span xui-modal-open="issuePoints" className='xui-cursor-pointer xui-font-sz-90 psc-text' onClick={()=>{setPId(item?.user_data?.unmasked); setIssueLoyalty(prev=>!prev);}} >Issue Points</span>
                                    <span xui-modal-open="checkoutPoints" className='xui-cursor-pointer xui-font-sz-90 psc-text' onClick={()=>{setPId(item?.user_data?.unmasked); setCheckoutLoyalty(prev=>!prev)}} >Checkout</span>
                                </span>
                                {/* <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span> */}
                            </td>
                        </tr>
                    )
                })}
                
                </table>
            </div>
            <div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
                <div className='xui-d-inline-flex xui-flex-ai-center'>
                    <span>Rows per page:</span>
                    <select onChange={handleSelectRows} className='psc-select-rows-per-page xui-ml-half'>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className='xui-mx-1 xui-lg-mx-2'>
                    <span><span className='xui-font-w-bold'>11 - 20</span> of 194</span>
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
        <section className='xui-modal' xui-modal="issuePoints">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <div className='issuePoints'>
                <label>Issue Loyalty Points - fill details below</label>
            <form onSubmit={handleIssue} className='mt-2'>
                    <div>
                        <label>Passcoder ID</label>
                        <input
                            // onChange={(e)=>setPId(e.target.value)} 
                            className='p-2   border border-solid border-slate-300 w-full mt-2  rounded-md outline-none' 
                            type="text" 
                            value={pId}
                            min={6}
                            max={8}
                            disabled
                            required />
                    </div>
                    
                    <div className='mt-3'>
                        <label>Loyalty Points to add</label>
                        <input 
                            onChange={(e)=>setLoyaltyPoints(Number(e.target.value))}
                            className='p-2 border border-solid border-slate-300  w-full mt-2 rounded-md outline-none' 
                            type="number"

                            min={1}
                            disabled={loading}
                            required />
                    </div>

                    <button  className={`xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85`}>Continue {!loading&&<BiNavigation />} {loading && <TailSpin speed={3} height={24} />} </button>
                </form>
                </div>
            </div>
        </section>
        <section className='xui-modal' xui-modal="checkoutPoints">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <div className='checkoutPoints'>
                <label>Checkout with Loyalty Points - fill details below</label>
            <form onSubmit={handleCheckout} className='mt-2'>
                    <div>
                        <label>Passcoder ID</label>
                        <input
                            // onChange={(e)=>setPId(e.target.value)} 
                            className='p-2 border border-solid border-slate-300 w-full mt-2 rounded-md outline-none' 
                            type="text" 
                            value={pId}
                            minLength={6}
                            maxLength={8}
                            disabled
                            required />
                    </div>
                    
                    <div className='mt-3'>
                        <label>Loyalty Points to subtract</label>
                        <input 
                            onChange={(e)=>setLoyaltyPoints(Number(e.target.value))}
                            className='p-2 border border-solid border-slate-300 w-full mt-2 rounded-md outline-none' 
                            type="number"
                            min={1}
                            disabled={loading}
                            required />
                    </div>

                    <button className={`${loading? "w-28": "w-20"} flex items-center gap-2 justify-center mt-3 rounded-md bg-purple text-white p-3`}>Continue {!loading&&<BiNavigation />} {loading && <TailSpin speed={3} height={24} />} </button>
                </form>
                </div>
            </div>
        </section>
        <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
                {/* */}

                <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
            <div className='hidden p-5 md:flex flex-col justify-between w-[250px] bg-[#F9FAFC] h-screen text-xs'>
                <div>
                    <img src={aside} />

                    <form onSubmit={handleAddUserToList} className='xui-form xui-max-w-450 xui-mx-auto'>
                        <h2 className='font-semibold'>Add User</h2>
                        <p className='text-xs mt-1'>Input the user’s Passcoder ID to add them to your list</p>
                        <input 
                        style={{
                            marginTop:  "20px"
                        }}
                            onChange={(e)=>setPid(e.target.value)} 
                            type="text" 
                            className='xui-bdr-rad-half' 
                            placeholder='PID'
                            minLength={6}
                            maxLength={8}
                            required />
                        
                        <div className='xui-form-box'>

                        <button

                            className='xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85'>
                                Add User
                                {!loading&&<BiNavigation />} 
                            {loading && <TailSpin stroke='#fff' speed={3} height={14} />}
                        </button>
                                </div>
                    </form>
                </div>
            </div>
            </div>
            </div>

            {errorNotification && <Error 
    lead={notification.message} 
    sub={notification.data}
    show={errorNotification}
    onClose={()=>setErrorNotification(false)} 
    />}
    {successNotification && <Congratulations 
    lead={notification.message} 
    show={successNotification}
    onClose={()=>setSuccessNotification(false)}
  />}
        </Screen>
        </>
    );
}