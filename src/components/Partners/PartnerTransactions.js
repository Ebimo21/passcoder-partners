import React, { useState, useEffect } from 'react'
import "./assets/style.css"
import SideBar from './SideBar'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import SearchBar from './components/SearchBar'
import { PartnerTransactions } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Nav2 from './Nav2'


function PartnerTransaction() {
    const jwt = jsCookie.get("jwt")
    const [transactions, setTransactions] = useState()
    const [showMenu, setShowMenu] = useState(false)

    
    async function getPartnerTransactions (){
        const response = await PartnerTransactions(jwt)
        console.log(response.rows)
        setTransactions(response.data.rows)
    }

    useEffect(()=>{
        getPartnerTransactions()
    },[])
  return (
    <div>
      <SideBar show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
      
      <div className='p-5 md:pl-14 md:ml-[250px] '>
        <Nav2 lead={"Transactions"} action={(e)=>setShowMenu(prev=>!prev)} />

        <div className='mt-10'>
            <div className='flex justify-between text-sm font-medium mb-3 pb-3 border-b border-b-solid border-b-slate-400'>
                <span className='flex items-center gap-2'> </span>
                {/* <button  className='flex items-center gap-2 text-mainColor'>Create Offer <AiOutlinePlusCircle/></button> */}
            </div>
        <div className='overflow-x-auto'>
            <table className='w-screen md:w-full max-w-5xl font-medium text-center text-base md:text-lg text-slate-500 '>
                <thead>
                    <tr className='p-2 bg-[#F1F1F1] text-slate-700'>
                        <th className='min-w-[200px] md:max-w-[250px] p-4 text-left'>Reference</th>
                        <th className='w-10 p-4  '>Amount</th>
                        <th className='w-10 p-4  '>Type</th>
                        <th className='w-10 p-4  '>Status</th>
                        <th className='w-40 p-4  '>Date</th>
                    </tr>
                </thead>
                {transactions?.map((record, index)=>{
                    return(
                        <tbody className='' key={record?.unique_id}>
                            <tr >
                                <td className='min-w-[250px] md:max-w-[300px] block text-left w-10 p-6 border-b border-b-slate-200  border-b-solid'>
                                    {record?.unique_id}
                                </td>
                                <td className='w-10 p-4 border-b border-b-slate-200  border-b-solid '>
                                    {record?.amount}
                                </td>
                                <td className="w-10 p-4 border-b border-b-slate-200  border-b-solid ">
                                    {record?.type}
                                </td>
                                <td className="w-10 p-4 border-b border-b-slate-200  border-b-solid ">
                                    {record?.transaction_status}
                                </td>
                                <td className="w-60 inline-block p-4 border-b border-b-slate-200  border-b-solid ">
                                    {record?.updatedAt.date}
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
        </div>
      </div>

    </div>
  )
}

export default PartnerTransaction