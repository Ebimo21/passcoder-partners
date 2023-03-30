import React, {useState} from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import SuccessModal from '../SuccessModal'
import VerificationProgressBar from '../VerificationProgressBar'


function ExtendedVerification() {
    const [openModal, setOpenModal] = useState(false)

    const [count, setCount] = useState(1)

    const [formData, setFormData ]= useState({
        firstName: '',
        middleName: '',
        lastName: '',
        houseAddres: '',
        lga: '',
        state: '',
        country: '',
        nin: '',
        slip: '',

        nokFirstName: '',
        nokMiddleName: '',
        nokLastName: '',
        nokAddress: '',
        vin: '',
        votersCard: '',
        driversLicenseNumber: '',
        driversLicense: '',

        bvn: '',
        passportNumber: '',
        passport: '',

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
                label: "First Name",
                name: "firstName",
                placeholder: "First Name"
            },

            {
                type: "text",
                label: "Middle Name",
                name: "middleName",
                placeholder: "Middle Name"
            },

            {
                type: "text",
                label: "Last Name",
                name: "lastName",
                placeholder: "Last Name"
            },

        ], 
        [
            {
                type: "text",
                label: "House Address",
                name: "houseAddress",
                placeholder: "House Addresses"
            }
        ],
        [
            {
                type: "text",
                label: "Local Government Area",
                name: "lga",
                placeholder: "LGA"
            },
            {
                type: "text",
                label: "State",
                name: "state",
                placeholder: "State"
            },

            {
                type: "text",
                label: "Country",
                name: "country",
                placeholder: "Country"
            }
        ],
        [
            {
                type: "text",
                label: "National Identity Number",
                name: "nin",
                placeholder: "NIN"
            },

            {
                type: "text",
                label: "Upload Nin Slip",
                name: "slip",
                placeholder: "Select Document"
            }
        ]
      ]
      const formFields2 =[
        [
            {
                type: "text",
                label: "Next-of-Kin First Name",
                name: "nokFirstName",
                placeholder: "Next-of-Kin First name",
                divCss: ""
            },

            {
                type: "text",
                label: "Next-of-Kin Middle Name",
                name: "nokMiddleName",
                placeholder: "Next-of-Kin Middle Name"
            },
            
            {
                type: "text",
                label: "Next-of-Kin Last Name",
                name: "nokLastName",
                placeholder: "Next-of-Kin Last Name"
            },

        ], 
        [],
        [
            {
                type: "text",
                label: "Voters Identity Number (VIN)",
                name: "vin",
                placeholder: "VIN",
                secCss: "",
            },
            
            {
                type: "text",
                label: "Upload Voters Card",
                name: "votersCard",
                placeholder: "Select Document",
                secCss: "",
            }
        ],
        [
            {
                type: "text",
                label: "Drivers License Number",
                name: "driversLicenseNumber",
                placeholder: "Drivers License Number",
                secCss: "",
            },

            {
                type: "text",
                label: "Upload Drivers License Card *",
                name: "driversLicense",
                placeholder: "Select Document",
            secCss: "",
            }
        ]
      ]
      const formFields3 =[
        [],
        [
            
            {
                type: "text",
                label: "International Passport ID Number",
                name: "passportNumber",
                placeholder: "Passport Number"
            },

            {
                type: "text",
                label: "Upload Passport Data Page",
                name: "passport",
                placeholder: "Passport Number"
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
                    <h2 className="text-2xl font-medium text-mainColor">Extended Bio Data</h2>
                    
                    <form className='mt-5 max-w-sm md:max-w-full'>
                        {count ===1 ? (
                            <div className='flex flex-wrap gap-5 '>
                                {formFields1.map((one, indexe)=>{
                                    if(indexe===1){
                                        return(
                                            <span className='flex flex-wrap basis-full'>
                                                <label>House Address</label>
                                                <input value={formData['houseAddress']} onChange={handleChange} className='p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md' type="text" name="houseAddress" placeholder='House Address' />
                                            </span> 
                                        )
                                    }
                                    return(
                                        <div className='flex  flex-wrap justify-between gap-5   '>
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
                                {formFields2.map((one, indexe)=>{
                                    if(indexe===1){
                                        return(
                                            <span className='flex flex-wrap basis-full'>
                                                <label>House Address</label>
                                                <input value={formData['nokAddress']} onChange={handleChange} className='p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md' type="text" name="nokAddress" placeholder='House Address' />
                                            </span> 
                                        )
                                    }
                                    
                                    return(
                                        <div className={`flex justify-between flex-wrap gap-5 ${!indexe===0? "md:gap-0":""} `}>
                                            {one.map((item, index)=>{
                                                return(
                                                    <span className={`flex flex-wrap basis-full   ${indexe===0? "md:basis-1/4":"md:basis-2/5"} `}>
                                                        <label>{item.label}</label>
                                                            <input 
                                                                onChange={handleChange} 
                                                                className={`p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md `} 
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
                                {formFields3.map((one, indexe)=>{
                                    if(indexe===0){
                                        return(
                                            <span className='flex flex-wrap basis-full'>
                                                <label>Bank Verification Number</label>
                                                <input value={formData['bvn']} onChange={handleChange} className='p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md' type="text" name="bvn" placeholder='BVN' />
                                            </span> 
                                        )
                                    }
                                    return(
                                        <div className={`flex justify-between flex-wrap gap-5 ${!indexe===0? "md:gap-0":""} `}>
                                            {one.map((item, index)=>{
                                                return(
                                                    <span className={`flex flex-wrap basis-full md:basis-2/5`}>
                                                        <label>{item.label}</label>
                                                            <input 
                                                                onChange={handleChange} 
                                                                className={`p-2 mt-2 basis-full  border border-slate-400 borderso rounded-md `} 
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
                                <button onClick={(e)=>handleNext(e)}  className='p-4 bg-altPurple text-white w-32 flex items-center gap-2 '>Next <MdKeyboardArrowLeft/> </button>
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

export default ExtendedVerification
