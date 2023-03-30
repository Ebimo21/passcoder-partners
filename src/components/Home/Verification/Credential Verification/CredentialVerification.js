import React, { useState } from 'react'
import plus from '../assets/plus.png'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import VerificationProgressBar from '../VerificationProgressBar'
import SuccessModal from '../SuccessModal'


function CredentialVerification() {

    const [count, setCount] = useState(1)
    const [openModal, setOpenModal] = useState(false)

    const [formData, setFormData ]= useState({
        primarySchool: '',
        secondarySchool: '',
        primarySchoolStart: '',
        primarySchoolEnd: '',
        secondarySchoolStart: '',
        secondarySchoolEnd: '',
        tertiarySchool: '',
        tertiarySchoolStart: '',
        tertiarySchoolEnd: '',
        workHistory: '',
        workHistoryStart: '',
        workHistoryEnd: '',
      })


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

    const formFields1 =[
        [
            {
                type: "text",
                label: "Primary School",
                name: "primarySchool",
                placeholder: "Name of Primary school",
            },

            {
                type: "date",
                label: "Start Date",
                name: "primarySchoolStart",
                placeholder: ""
            },
            
            {
                type: "date",
                label: "End Date",
                name: "primarySchoolEnd",
                placeholder: ""
            },
        ],

        [
            {
                type: "text",
                label: "Secondary School",
                name: "secondarySchool",
                placeholder: "Name of Secondary school",
            },

            {
                type: "date",
                label: "Start Date",
                name: "secondarySchoolStart",
                placeholder: ""
            },
            
            {
                type: "date",
                label: "End Date",
                name: "secondarySchoolEnd",
                placeholder: ""
            },
        ],

      ]
    const formFields2 =[
        [
            {
                type: "text",
                label: "Tertiary School",
                name: "tertiarySchool",
                placeholder: "Name of Tertiary school",
            },

            {
                type: "date",
                label: "Start Date",
                name: "tertiarySchoolStart",
                placeholder: ""
            },
            
            {
                type: "date",
                label: "End Date",
                name: "tertiarySchoolEnd",
                placeholder: ""
            },
        ],

        [
            {
                type: "text",
                label: "Secondary School",
                name: "secondarySchool",
                placeholder: "Name of Secondary school",
            },

            {
                type: "date",
                label: "Start Date",
                name: "secondarySchoolStart",
                placeholder: ""
            },
            
            {
                type: "date",
                label: "End Date",
                name: "secondarySchoolEnd",
                placeholder: ""
            },
        ],

      ]
    const formFields3 =[
        [
            {
                type: "text",
                label: "Work History",
                name: "workHistory",
                placeholder: "Name of Previous Work",
            },

            {
                type: "date",
                label: "Start Date",
                name: "workHistoryStart",
                placeholder: ""
            },
            
            {
                type: "date",
                label: "End Date",
                name: "workHistoryEnd",
                placeholder: ""
            },
        ],
      ]
      
  return (
    <div>
        <VerificationProgressBar/>
        <div>
            <div className="flex">
                <div className='hidden lg:flex items-center bg-lightGrey md:basis-1/3 px-4'>
                    <div className='p-6 text-4xl'>
                        <h3 className=''>Congratulations</h3>
                        <span>You are almost there.</span>
                        <p className='text-[#B3B5B9] t text-base mt-8'>enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </div>
                <div className='p-4 md:basis-2/3 text-base md:px-20 md:pt-10'>
                    <h2 className="text-2xl font-medium text-mainColor">Credentials</h2>
                    
                    <form className='mt-5 max-w-sm md:max-w-full'>
                        {count ===1 ? (
                            <div className='flex flex-wrap gap-5 '>
                                <div>
                            {formFields1.map((one, indexe)=>{
                                return(
                                    <div className={`flex justify-between flex-wrap gap-5 ${!indexe===0? "md:gap-0":""} `}>
                                        {one.map((item, index)=>{
                                            return(
                                                <span className={`flex flex-wrap basis-full ${indexe==0 ? !index==0? "md:basis-2/5": "": !index==0? "md:basis-2/5": ""}`}>
                                                    <label>{item.label}</label>
                                                    <input 
                                                        onChange={handleChange} 
                                                        className={`p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md `} 
                                                        type={item.type} 
                                                        name={item.name}
                                                        placeholder={item.placeholder}
                                                        value={formData[item.name]} />

                                                        {index==0 && (
                                                            <><input type="checkbox" name='primary-ongoing' /> <span> Ongoing</span></>
                                                        )}
                                                </span>
                                            )
                                        })}
                                    </div>
                                ) 
                            })}
                                </div>
                            </div>
                           ): null}

                        {count === 2? (
                            <div className='flex flex-wrap gap-5 '>
                                <div>
                        {formFields2.map((one, indexe)=>{
                            return(
                                <div className={`flex justify-between flex-wrap gap-5 ${!indexe===0? "md:gap-0":""} `}>
                                    {one.map((item, index)=>{
                                        return(
                                            <span className={`flex flex-wrap basis-full ${indexe==0 ? !index==0? "md:basis-2/5": "": !index==0? "md:basis-2/5": ""}`}>
                                                <label>{item.label}</label>
                                                <input 
                                                    onChange={handleChange} 
                                                    className={`p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md `} 
                                                    type={item.type} 
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    value={formData[item.name]} />

                                                    {index==0 && (
                                                        <><input type="checkbox" name='primary-ongoing' /> <span> Ongoing</span></>
                                                    )}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                                </div>
                            </div>
                        ): null}

                        {count === 3? (
                            <div className='flex flex-wrap gap-5 '>
                                <div>
                        {formFields3.map((one, indexe)=>{
                            return(
                                <div className={`flex justify-between flex-wrap gap-5 ${!indexe===0? "md:gap-0":""} `}>
                                    {one.map((item, index)=>{
                                        return(
                                            <span className={`flex flex-wrap basis-full ${indexe==0 ? !index==0? "md:basis-2/5": "": !index==0? "md:basis-2/5": ""}`}>
                                                <label>{item.label}</label>
                                                <input 
                                                    onChange={handleChange} 
                                                    className={`p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md `} 
                                                    type={item.type} 
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    value={formData[item.name]} />

                                                    {index==0 && (
                                                        <><input type="checkbox" name='primary-ongoing' /> <span> Ongoing</span></>
                                                    )}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                                </div>
                                <button className='w-full mt-6 p-4 bg-lighterGrey text-altPurple gap-4 justify-center  flex items-center'><img src={plus} />Add Credentials</button>
                            </div>
                        ): null}

                        <div className='flex gap-4 justify-end mt-10'>
                            <button onClick={(e)=>handlePrevious(e)} disabled={count<2}  className='p-4 border border-solid border-altPurple text-altPurple w-32 '>Back</button>
                            {count<3? (
                                <button onClick={(e)=>handleNext(e)}  className='p-4 bg-altPurple text-white w-32 flex items-center gap-2'>Next <MdKeyboardArrowLeft/></button>
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

export default CredentialVerification
