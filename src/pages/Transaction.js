import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';// import Filter from '../icons/Filter';
import Star from '../icons/Star';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import {useState, useEffect} from "react";
import { PartnerTransactions } from '../config/apiCalls';
import Screen from '../components/Screen';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export default function Transaction(){
    const [transactions, setTransactions] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(1);
    const [transactionsLoading, setTransactionsLoading] = useState(true);

    
    async function getPartnerTransactions (){
        setTransactionsLoading(true);
        const response = await PartnerTransactions()
        .finally((res)=>setTransactionsLoading(false));

        setTransactions(response?.data?.rows);
    }

    useEffect(()=>{
        getPartnerTransactions();
    },[]);

    const handleSelectRows = async (e) =>{
        setTransactionsLoading(true);

        const row = e.target.value;
        setRowsPerPage(row);
        const response = await PartnerTransactions(page, row)
        .finally((res)=>setTransactionsLoading(false));

        setTransactions(response.data.rows)

    }

    const handleGetNextPage = async() =>{
        setTransactionsLoading(true);
        setPage(page=>page+1)
        console.log(page);
        const response = await PartnerTransactions(page+1, rowsPerPage)
        .finally((res)=>setTransactionsLoading(false));
        setTransactions(response.data.rows);
    }
    
    const handleGetPreviousPage = async() =>{
        setTransactionsLoading(true);
        setPage(page=>page-1)
        if(!page===1){
            setPage(page=>page-1)

        }
        const response = await PartnerTransactions(page-1, rowsPerPage)
        .finally((res)=>setTransactionsLoading(false));
        setTransactions(response.data.rows);
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
                    <th className='xui-min-w-300 xui-text-left'>Reference</th>
                    <th className='xui-min-w-150'>Amount</th>
                    <th className='xui-min-w-150'>Type</th>
                    <th className='xui-min-w-100'>Status</th>
                    <th className='xui-min-w-150'>Date</th>
                </tr>
                {!transactionsLoading && transactions?.map((item, index)=>{
                    return(
                        <tr key={index} className=''>
                            <td className='xui-opacity-5 xui-text-left'>
                            <div className='xui-d-inline-flex xui-flex-ai-center'>
                                <p>{item?.unique_id}</p>
                            </div>
                            </td>
                            <td className='xui-opacity-5'>{item?.amount}</td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.type}</span>
                            </td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.transaction_status}</span>
                            </td>
                            <td className='xui-opacity-5 xui-font-w-bold'>
                            <span>{item?.updatedAt?.date}</span>
                            </td>
                        </tr>
                    )
                })}
                
                </table>

                {transactionsLoading && (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20px"}} className="xui-mt-2"><p>Transactions Loading... </p><TailSpin stroke='black'  color='#fff' /></div>
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
                    <button button onClick={handleGetNextPage} className='xui-ml-half xui-cursor-pointer'>
                        <Arrowright width="18" height="18" />
                    </button>
                </div>
            </div>
            </section>
        </Content>
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
            </Screen>
        </>
    );
}