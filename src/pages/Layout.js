import { Outlet, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo-white.png';
import Category from '../icons/Category';
import Swap from '../icons/Swap';
import Tag from '../icons/Tag';
import Wallet from '../icons/Wallet';
import Setting from '../icons/Setting';
import Logout from '../icons/Logout';
import '../assets/css/style.css';
import { Partner, PartnersLogOut } from "../config/apiCalls";
import { useState, useEffect } from "react";
import Key from "../icons/Key";
import Team from "../icons/Team";
import Alarm from "../icons/Alarm";
import Token from "../icons/Token";
import "../assets/css/alt.css"
import PartnersUpgradeAccount from "../components/modals/PartnersUpgradeAccount";

function Truncate(string, len){
    
    return string?.substring(0, len) + '...';
}


export default function Layout(){
    const navigate = useNavigate();

    const [partnerDetails, setPartnerDetails] = useState()
    const loc = useLocation();

    const [upgradeModal, setUpgradeModal] = useState(true);
    
    async function getPartnerDetails (){
        const response = await Partner()
        setPartnerDetails(response.data)
        console.log(response.data.stripped);
    }

    useEffect(()=>{
        getPartnerDetails();

    },[])



    const handleLogout = ()=>{
         PartnersLogOut();
         setTimeout(() => {
            navigate(`/access/${partnerDetails.stripped}`);
          }, 4000);
    }

    const handleAccountUpgrade = async (e)=>{
        e.preventDefault();
        setUpgradeModal(false);
    }
    return(
        <>
        <section className="xui-dashboard">
        <div className="navigator xui-text-white xui-px-2 disable-scrollbars">
        <div className="brand xui-pt-2">
            <div className="maxified xui-d-flex xui-flex-ai-center">
            <Link className='xui-text-inherit xui-text-dc-none' to="/">
                <div className='xui-d-inline-flex'>
                <img className='xui-img-30' src={Logo} alt='logo' />
                <div className='xui-pl-1'>
                    <p className='xui-font-w-bold'>Passcoder</p>
                    <span className='xui-font-sz-70 xui-opacity-7'>for partner</span>
                </div>
                </div>
            </Link>
            </div>        
        </div>
        <div className="links xui-pt-2">
            <div className='xui-d-flex psc-dashboard-profile'>
            <div className='xui-w-50 xui-h-50 xui-bdr-rad-half xui-bg-pos-center xui-bg-sz-cover' style={{backgroundImage: `url(${partnerDetails?.photo})`}}></div>
            <div className='xui-pl-half' style={{width: "calc(100% - 50px)"}}>
                <h3 className='xui-font-sz-90 xui-font-w-normal'>{partnerDetails?.name}</h3>
                <span className='xui-d-inline-block xui-font-sz-70 xui-opacity-5'>{Truncate(partnerDetails?.email, 18)}</span>
            </div>
            </div>
            <Link  to='/' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side " + (loc.pathname === '/' ? 'active' : '')}>
                <div className="icon">
                    <Category width="20" height="20" />
                </div>
                <div className="name xui-ml-half">
                    <span>Dashboard</span>
                </div>
            </Link>
            <Link to='/offers' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side " + (loc.pathname === '/offers' ? 'active' : '')}>
                <div className="icon">
                    {/* <Swap width="20" height="20" /> */}
                    <Tag />
                </div>
                <div className="name xui-ml-half">
                    <span>Offers</span>
                </div>
            </Link>
            <Link to='/loyalty' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side " + (loc.pathname === '/loyalty' ? 'active' : '')}>
                <div className="icon">
                    <Team />
                </div>
                <div className="name xui-ml-half">
                    <span>Loyalty</span>
                </div>
            </Link>
            <Link to='/announcement' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side " + (loc.pathname === '/announcement' ? 'active' : '')}>
                <div className="icon">
                    <Alarm width="24" height="24" />
                </div>
                <div className="name xui-ml-half">
                    <span>Announcement</span>
                </div>
            </Link>
            <Link to='/transaction' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side " + (loc.pathname === '/transaction' ? 'active' : '')}>
                <div className="icon">
                    <Swap width="20" height="20" />
                </div>
                <div className="name xui-ml-half">
                    <span>Transaction</span>
                </div>
            </Link>
            <Link to='/team' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side " + (loc.pathname === '/team' ? 'active' : '')}>
                <div className="icon">
                    <Token width="20" height="20" />
                </div>
                <div className="name xui-ml-half">
                    <span>Team</span>
                </div>
            </Link>
            <Link to='/settings' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side" + (loc.pathname === '/settings' ? 'active' : '')}>
                <div className="icon">
                    <Setting />
                </div>
                <div className="name xui-ml-half">
                    <span>Settings</span>
                </div>
            </Link> 
            <div className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side" }>
                <div className="icon">
                    <Key />
                </div>
                <div xui-modal-open="upgrade" className="name xui-ml-half">
                    <span>Upgrade</span>
                </div>
            </div> 
            <div className="bottom-fixed xui-mt--5">
                <div className="xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 menu-side">
                    <div className="icon">
                        <Logout width="20" height="20" />
                    </div>
                    <div onClick={handleLogout} className="name xui-ml-half">
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Outlet />
        </section>

        {upgradeModal && <PartnersUpgradeAccount
        show={upgradeModal}
        handleSubmit={handleAccountUpgrade} /> }
        </>
    );
}