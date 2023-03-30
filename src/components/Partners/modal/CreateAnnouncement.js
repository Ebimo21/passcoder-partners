import React from 'react'

function CreateAnnouncement({handleSubmit, dispatch, FORMACTION,  show, onClose}) {
    
    if(!show) {return null}

  return (
    <div onClick={onClose} className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-xs md:text-base '>
        <div onClick={e => e.stopPropagation()} className='bg-[#fefefe] mx-auto rounded-lg my-[1%] max-w-sm md:max-w-[700px] p-5 md:px-20 border-none outline-none'>
            <h3 className='font-bold text-2xl mb-2'>Create a new Announcement</h3>
            <p className='text-sm'>Keep your business above all. Let your users know the latest update and do many more.</p>

            <form onSubmit={handleSubmit} className='mt-4 text-sm'>
                <div className='flex flex-wrap'>
                    <label>Subject *</label>
                    <input 
                        className="outline-none border border-slate-200 border-solid p-3 rounded-md basis-full mt-2" 
                        type="text" 
                        onChange={(e)=>dispatch({type: FORMACTION.TITLE, payload: e.target.value})}
                        name="title" 
                        placeholder="Enter Announcement Title" />
                </div>

                <div className='flex flex-wrap mt-4'>
                    <label>Announcement</label>
                    <textarea 
                        onChange={(e)=>{dispatch({type: FORMACTION.DESCRIPTION, payload: e.target.value}); console.log(e.target.value)}}
                        className='p-2 border border-solid border-slate-400 block w-full outline-none rounded-md '
                        name='description'
                        placeholder='Enter announcement'
                        cols="10" 
                        rows="10">
                    </textarea>
                </div>

                <button 
                className='mt-5 rounded-md bg-purple text-white p-2'>Publish</button>

            </form>


        </div>
    </div>
  )
}

export default CreateAnnouncement