// import Filter from '../icons/Filter';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import Star from '../icons/Star';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import {useState, useReducer, useEffect, useRef} from "react"
import { PartnerAddUserToAnnouncementList, PartnerCreateAnnouncement, PartnerGetAnnouncements } from '../config/apiCalls';
import Screen from '../components/Screen';
import CreateAnnouncement from '../components/modals/CreateAnnouncement';
import aside from '../assets/images/frame1.png'
import Congratulations from '../components/modals/Congratulations';
import Error from '../components/modals/Error';
import { BiNavigation } from 'react-icons/bi';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';


export default function Announcement(){

    const [render, setRender] = useState(false);
    const [createAnnouncement, setCreateAnnouncement] = useState(false);
    const [announcement, setAnnouncement] = useState([]);
    const [notification, setNotification] = useState("");
    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
    const [pid, setPid] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(1);
    const [announcementLoading, setAnnouncmentLoading] = useState(true);


    const handleAddUserToList =async(e)=>{
        e.preventDefault();
        setLoading(true)
        const response = await PartnerAddUserToAnnouncementList(pid)
        .finally(e=>setLoading(false))
        setNotification(response?.data);

        if(response.success)setSuccessNotification(true);
        else setErrorNotification(true);
    }

    const handleGetAnnouncement =async () =>{
        setAnnouncmentLoading(true);
        const response = await PartnerGetAnnouncements(page, rowsPerPage)
        .finally((res)=>setAnnouncmentLoading(false));
        setAnnouncement(response?.data?.rows);
        console.log(response?.data?.rows);
    }

    const handleCreateAnnouncement = async(e)=>{
        e.preventDefault();
        const response = await PartnerCreateAnnouncement(data);
        setCreateAnnouncement(false);

        if(response.success){
            setSuccessNotification(prev=>true);
        }else{
            setErrorNotification(prev=>true);
        }
        setRender(false)
        setNotification(response?.data);
    }
    
    const FORMACTION= {
        TITLE: "title",
        DESCRIPTION: "description"
    }

    const initialState = {
        title: "",
        description: "",
    }

    const reducer =(state, action)=>{
        const {type, payload}= action;

        switch(type){
            case FORMACTION.TITLE:
                return {...state, title: payload};
            case FORMACTION.DESCRIPTION:
                return {...state, description: payload};
            default:
                return state;
        }
    }

    const [data, dispatch]= useReducer(reducer, initialState );
    useEffect(()=>{ handleGetAnnouncement() }, []);

    const addAnnouncementBtnRef = useRef();

    useEffect(()=>{

        const handleCaptureAddAnnouncement=()=>{
            setRender(prev=>!prev);
        }

        addAnnouncementBtnRef.current?.addEventListener('click', handleCaptureAddAnnouncement, false);
        // return ()=> addOfferBtnRef.current?.removeEventListener('click', handleCaptureAddOffers);
        

    }, [render]);

    const handleSelectRows = async (e) =>{
        setAnnouncmentLoading(true);

        const row = e.target.value;
        setRowsPerPage(row);
        const response = await PartnerGetAnnouncements(page, row)
        .finally((res)=>setAnnouncmentLoading(false));
        setAnnouncement(response.data.rows)

    }

    const handleGetNextPage = async() =>{
        setAnnouncmentLoading(true);
        setPage(page=>page+1)
        console.log(page);
        const response = await PartnerGetAnnouncements(page+1, rowsPerPage)
        .finally((res)=>setAnnouncmentLoading(false));

        setAnnouncement(response.data.rows);

    }
    
    const handleGetPreviousPage = async() =>{
        setAnnouncmentLoading(true);
        setPage(page=>page-1)
        if(!page===1){
            setPage(page=>page-1)

        }
        const response = await PartnerGetAnnouncements(page-1, rowsPerPage)
        .finally((res)=>setAnnouncmentLoading(false));

        setAnnouncement(response.data.rows);
    }
    return(
        <>
        <Screen aside="true" Navbar="false" >
            <Content>
            <Navbar placeholder="Search something..." />
                <p>Keep your business above all. Let your users know the latest update and do many more.</p>
                <section className=''>
                <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                    <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Activities</h1>
                    <div className='xui-d-inline-flex'>
                    <span ref={addAnnouncementBtnRef}><button xui-modal-open="addAnnouncement" className='xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85' >Create Announcement</button></span>
                </div>
                    
                </div>
                <div className='xui-table-responsive'>
                    <table className='xui-table xui-font-sz-90'>
                    <thead>
                    <tr className='xui-text-left xui-opacity-6'>
                        <th className='xui-min-w-20'>S/N</th>
                        <th className='xui-min-w-300'>Name</th>
                        <th className='xui-min-w-20'>Views</th>
                        <th className='xui-min-w-20'>Users</th>
                        <th className='xui-min-w-20'>Status</th>
                        <th className='xui-min-w-100'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { !announcementLoading && announcement?.map((item, index)=>{
                        return(
                            <tr key={index} className=''>
                                <td className='xui-opacity-5'>
                                <span>{index+1}</span>
                                </td>
                                <td className='xui-opacity-5'>{item?.title}</td>
                                <td className='xui-opacity-5 xui-font-w-bold'>
                                <span>{item?.views}</span>
                                </td>
                                <td className='xui-opacity-5 xui-font-w-bold'>
                                <span>{item?.pids}</span>
                                </td>
                                <td className='xui-opacity-5 xui-font-w-bold'>
                                <span className={`${item?.status===0? "xui-badge-danger": item?.status=== 1? "xui-badge-success": "xui-badge-warning"} xui-badge xui-font-sz-80 xui-bdr-rad-half`}>{item?.status === 0? "Error": item?.status === 1 ? "Success" : "Pending"}</span>
                                </td>
                                <td className=''>
                                    <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>

                        
                    {announcementLoading && (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20px"}} className="xui-mt-2"><p>Announcements Loading... </p><TailSpin stroke='black'  color='#fff' /></div>
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

            {render&&<CreateAnnouncement 
            handleSubmit={handleCreateAnnouncement}
            dispatch={dispatch}
            FORMACTION={FORMACTION} 
            state={data}
            show={render} 
            />}
            <section className='xui-modal' xui-modal="viewMore">
                
            </section>
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