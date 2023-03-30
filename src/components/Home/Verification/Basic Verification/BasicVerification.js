import React, {useState} from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import VerificationProgressBar from '../VerificationProgressBar'
import SuccessModal from '../SuccessModal'

function BasicVerification() {
    const [count, setCount] = useState(1)
    const [openModal, setOpenModal] = useState(false)

    const [formData, setFormData ]= useState({
        passCoder: '',
        height: '',
        weight: '',
        bloodGroup: '',
        genotype: '',
        status: '',
        hospital: '',
        hospitalAdmissionDate: '',
        hospitalLocation: '',
        others: '',
        admission: '',
        dateReleased: '',
        emFirstName: '',
        emMiddleName: '',
        emLastName: '',
        relationship: '',
        phone: '',
      })

      const handleChange=(e)=>{
        const userData = e.target.value
          setFormData({ ...formData, [e.target.name]: userData })
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
                label: "PassCoder IDs",
                name: "passCoder",
                placeholder: "Enter your Passcoder ID"
            },

            {
                type: "text",
                label: "Height",
                name: "height",
                placeholder: "Enter Height"
            },

        ], 
        [
            {
                type: "text",
                label: "Weight",
                name: "weight",
                placeholder: "Enter Weight"
            },

            {
                type: "text",
                label: "Blood Group",
                name: "bloodGroup",
                placeholder: "Enter Blood Group"
            }
        ],
        [
            {
                type: "text",
                label: "Genotype",
                name: "genotype",
                placeholder: "Enter Genotype"
            },

            {
                type: "text",
                label: "Status",
                name: "status",
                placeholder: "Enter Status"
            }
        ],

        [
            {
                type: "text",
                label: "Others",
                name: "others",
                placeholder: "Enter Others"
            },

            
        ]
      ]
      const formFields2 =[
        [
            {
                type: "text",
                label: "PassCoder ID",
                name: "passCoder",
                placeholder: "Enter your Passcoder ID"
            },

            {
                type: "text",
                label: "Admission Details",
                name: "tin",
                placeholder: "Enter Details"
            },

        ], 
        [
            {
                type: "text",
                label: "Hospital",
                name: "hospital",
                placeholder: "Enter Hospital"
            },
            {
                type: "date",
                label: "Admission Date *",
                name: "hospitalAdmissionDate",
                placeholder: ""
            },

        ],
        [
            {
                type: "text",
                label: "Location",
                name: "hospitalLocation",
                placeholder: "Enter Hospital Location"
            },

            {
                type: "date",
                label: "Date Released *",
                name: "dateReleased",
                placeholder: ""
            }
        ]
      ]
      const formFields3 =[
        [
            {
                type: "text",
                label: "PassCoder ID",
                name: "passCoder",
                placeholder: "Enter your Passcoder ID"
            },

        ], 

        [
            {
                type: "text",
                label: "First Name",
                name: "emFirstName",
                placeholder: "Enter First Name"
            },
            {
                type: "text",
                label: "Middle Name",
                name: "emMiddleName",
                placeholder: "Enter Middle Name"
            }
        ],

        [
            
            {
                type: "text",
                label: "Last Name *",
                name: "emLastName",
                placeholder: "Enter Last Name"
            },

            {
                type: "text",
                label: "Relationship",
                name: "relationship",
                placeholder: "Enter Relationship type"
            }

        ],
        [
            

            {
                type: "text",
                label: "Phone Number *",
                name: "phone",
                placeholder: "Enter Phone Number"
            },
            {
                type: "text",
                label: "Status *",
                name: "status",
                placeholder: "Status"
            }
        ]
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
                    
                    {count ===1? <h2 className="text-2xl font-medium text-mainColor">Basic Details</h2>: null}
                    {count ===2? <h2 className="text-2xl font-medium text-mainColor">Medical Details</h2>: null}
                    {count ===3? <h2 className="text-2xl font-medium text-mainColor">Emergency Contact</h2>: null}
                    
                    <form className='mt-5 max-w-sm md:max-w-full'>
                        {count ===1 ? (
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

                        {count === 2? (
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

                        {count === 3? (
                            <div className='flex flex-wrap gap-5 '>
                            {formFields3.map((one, index)=>{
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

export default BasicVerification
