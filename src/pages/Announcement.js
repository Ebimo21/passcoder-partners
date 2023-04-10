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


export default function Announcement(){

    const [render, setRender] = useState(false);
    const [createAnnouncement, setCreateAnnouncement] = useState(false);
    const [announcement, setAnnouncement] = useState([]);
    const [notification, setNotification] = useState("");
    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
    const [pid, setPid] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    const handleAddUserToList =async(e)=>{
        e.preventDefault();
        const response = await PartnerAddUserToAnnouncementList(pid);
        setNotification(response?.data);

        if(response.success)setSuccessNotification(true);
        else setErrorNotification(true);
    }

    const handleGetAnnouncement =async () =>{
        const response = await PartnerGetAnnouncements();
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
                    <tr className='xui-text-left xui-opacity-6'>
                        <th className='xui-min-w-20'>S/N</th>
                        <th className='xui-min-w-300'>Name</th>
                        <th className='xui-min-w-20'>Views</th>
                        <th className='xui-min-w-20'>Users</th>
                        <th className='xui-min-w-20'>Status</th>
                        <th className='xui-min-w-100'>Actions</th>
                    </tr>
                    {announcement?.map((item, index)=>{
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

            {render&&<CreateAnnouncement 
            handleSubmit={handleCreateAnnouncement}
            dispatch={dispatch}
            FORMACTION={FORMACTION} 
            show={render} 
            />}
            <section className='xui-modal' xui-modal="viewMore">
                
            </section>
            <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
            <div className='hidden p-5 md:flex flex-col justify-between w-[250px] bg-[#F9FAFC] h-screen text-xs'>
                <div>
                    <img src={aside} />

                    <form onSubmit={handleAddUserToList} className='bg-[#EDF0F6] p-2 text-sm'>
                        <h2 className='font-semibold'>Add User</h2>
                        <p className='text-xs mt-1'>Input the user’s Passcoder ID to add them to your list</p>
                        <input 
                            onChange={(e)=>setPid(e.target.value)} 
                            type="text" 
                            className='p-1  border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            placeholder='PID'
                            minLength={6}
                            maxLength={8}
                            required />

                        <button 
                            className='flex items-center gap-2 justify-center bg-purple px-4 py-2  m-auto 
                            rounded-md border border-solid border-purple text-white mt-3'>
                                Add User 
                        </button>
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