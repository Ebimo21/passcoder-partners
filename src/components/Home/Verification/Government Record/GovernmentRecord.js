import React, { useState } from 'react'
import plus from '../assets/plus.png'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import VerificationProgressBar from '../VerificationProgressBar'
import SuccessModal from '../SuccessModal'


function GovernmentRecord() {
    const [openModal, setOpenModal] = useState(false)
    const [count, setCount] = useState(1)

    const [formData, setFormData ]= useState({
        passCoder: '',
        state: '',
        lga: '',
        ward: '',
        unit: '',
        status: '',
        tin: '',
        documentReference: '',
        hospital: '',
        issueDate: '',
        proof: '',
      })
    
      const formFields1 =[
        [
            {
                type: "text",
                label: "PassCoder IDs",
                name: "passCoder",
                placeholder: "Enter your Passcoder ID"
            },

            {
                type: "text",
                label: "State",
                name: "state",
                placeholder: "Enter State"
            },

        ], 
        [
            {
                type: "text",
                label: "L.G.A.",
                name: "lga",
                placeholder: "Enter LGA"
            },

            {
                type: "text",
                label: "Ward",
                name: "ward",
                placeholder: "Enter Ward"
            }
        ],
        [
            {
                type: "text",
                label: "Unit",
                name: "unit",
                placeholder: "Enter Unit"
            },

            {
                type: "text",
                label: "Status",
                name: "status",
                placeholder: "Enter Status"
            }
        ]
      ]
      const formFields2 =[
        [
            {
                type: "text",
                label: "PassCoder IDs",
                name: "passCoder",
                placeholder: "Enter your Passcoder ID"
            },

            {
                type: "text",
                label: "TIN (Tax Identification Number)",
                name: "tin",
                placeholder: "Enter TIN"
            },

        ], 
        [
            {
                type: "text",
                label: "Document Reference*",
                name: "documentReference",
                placeholder: "Enter Document Reference"
            },

            {
                type: "text",
                label: "Issue Date",
                name: "issueDate",
                placeholder: "Enter Issue Date"
            }
        ],
        [
            {
                type: "text",
                label: "Proof",
                name: "proof",
                placeholder: "Enter Image Url"
            },

            {
                type: "text",
                label: "Status *",
                name: "status",
                placeholder: "Enter Status"
            }
        ]
      ]


      const handleChange=(e)=>{
        const userData = e.target.value
          setFormData({ ...formData, [e.target.name]: userData })
          console.log(formData)
        };


    const handleNext =(e)=>{
        e.preventDefault()
        setCount(count+1)
    }
    const handlePrevious =(e)=>{
        e.preventDefault()
        setCount(count-1)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        setOpenModal(!openModal)
    }
  return (
    <div>
        <VerificationProgressBar/>

        <div>
            <div className="flex">
                <div className='h md:h-[85vh] hidden lg:flex items-center bg-lightGrey md:basis-1/3 px-4'>
                    <div className='p-6 text-4xl'>
                        <h3 className=''>Congratulations</h3>
                        <span>You are almost there.</span>
                        <p className='text-[#B3B5B9] t text-base mt-8'>enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </div>
                <div className='p-4 md:h-[85vh] md:basis-2/3 text-base md:px-20 md:pt-10'>
                    <h2 className="text-2xl font-medium text-mainColor">Government Record</h2>
                    
                    <form className='mt-5 max-w-sm md:max-w-full'>
                        {count ===1 ? (
                            <div className='flex  flex-wrap justify-between gap-4'>
                                
                                <div className='flex flex-cols text-center flex-wrap basis-2/5 md:basis-3/12 p-2  justify-center border border-solid border-slate-400'>
                                    <img src={plus} />
                                    <p className='basis-full'>Birth Certificate</p>
                                </div>
                                
                                <div className='flex flex-cols text-center flex-wrap basis-2/5 md:basis-3/12 p-2  justify-center border border-solid border-slate-400'>
                                    <img src={plus} />
                                    <p className='basis-full'>Next of Kin</p>
                                </div>
                                
                                <div className='flex flex-cols text-center flex-wrap basis-2/5 md:basis-3/12 p-2  justify-center border border-solid border-slate-400'>
                                    <img src={plus} />
                                    <p className='basis-full'>Tax Records</p>
                                </div>
                                
                                <div className='flex flex-cols text-center flex-wrap basis-2/5 md:basis-3/12 p-2  justify-center border border-solid border-slate-400'>
                                    <img src={plus} />
                                    <p className='basis-full'>CAC</p>
                                </div>

                            </div>
                        ): null}

                        {count === 2? (
                            <div className='flex flex-wrap gap-5 '>
                                {formFields1.map((one, index)=>{
                                    return(
                                        <div className='flex  flex-wrap gap-5 md:gap-20  '>
                                            {one.map((item, index)=>{
                                                return(
                                                    <span className='flex flex-wrap basis-full md:basis-1/4'>
                                                        <label>{item.label}</label>
                                                        <input 
                                                            onChange={handleChange} 
                                                            className='p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md' 
                                                            type={item.type} 
                                                            name={item.name}
                                                            placeholder={item.placeholder}
                                                            value={formData[item.name]} />
                                                    </span>
                                                )
                                            })}
                            </div>


                    )
                })}
                            </div>
                        ): null}

                        {count === 3? (
                            <div className='flex flex-wrap gap-5 '>
                            {formFields2.map((one, index)=>{
                                return(
                                    <div className='flex  flex-wrap gap-5 md:gap-20  '>
                                        {one.map((item, index)=>{
                                            return(
                                                <span className='flex flex-wrap basis-full md:basis-1/4'>
                                                    <label>{item.label}</label>
                                                    <input 
                                                        onChange={handleChange} 
                                                        className='p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md' 
                                                        type={item.type} 
                                                        name={item.name}
                                                        placeholder={item.placeholder}
                                                        value={formData[item.name]} />
                                                </span>
                                            )
                                        })}
                        </div>


                )
            })}
                        </div>
                        ): null}

                        <div className='flex gap-4 justify-end mt-10'>
                            <button onClick={(e)=>handlePrevious(e)} disabled={count<2}  className='p-4 border border-solid border-altPurple text-altPurple w-32 '>Back</button>
                            {count<3? (
                                <button onClick={(e)=>handleNext(e)}  className='p-4 bg-altPurple text-white w-34 flex items-center gap-2 '>Next <MdKeyboardArrowLeft/></button>
                            ):(
                                <button onClick={(e)=>handleSubmit(e)}  className='p-4 bg-altPurple text-white w-32 '>Finish</button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
        {openModal && <SuccessModal setOpenModal={setOpenModal} openModal={openModal}/>}
    </div>
  )
}

export default GovernmentRecord
