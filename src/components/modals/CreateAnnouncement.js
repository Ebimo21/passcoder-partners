import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreateAnnouncement({handleSubmit, dispatch, FORMACTION, state,  show}) {

  
    if(!show) {return null}

    const modules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
        ['clean'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }
  
    const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
    ]

  return (
    <div>
        <section className='xui-modal' xui-modal="addAnnouncement">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
            <h3 className='font-bold text-2xl mb-2'>Create a new Announcement</h3>

            <form className="xui-form xui-mt--1" onSubmit={handleSubmit}>
                <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">
                    <label>Subject</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                        <input
                            onChange={(e)=>dispatch({type: FORMACTION.TITLE, payload: e.target.value})} 
                            type="text" 
                            name="name" 
                            minLength ={3}
                            maxLength={50}
                            placeholder="Enter Announcement Title"
                            required 
                            style={{width: "calc(100%)"}}/>
                    </div>
                </div>
                <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">

                    <div className='flex flex-wrap mt-4'>
                        <label>Description</label>
                        <ReactQuill style={{height: "100px"}} modules={modules} formats={formats} theme='snow' value={state.description} onChange={(e)=> dispatch({type: FORMACTION.DESCRIPTION, payload:e})} />
                        {/* <textarea
                            onChange={(e)=>dispatch({type: FORMACTION.DESCRIPTION, payload: e.target.value})}
                            name="announcement"
                            placeholder='Enter Announcement'
                            minLength={3}
                            maxLength={250}
                            cols="10" 
                            rows="3"
                            resize="none"
                            >

                        </textarea> */}
                    </div>
                </div>
                <div className="xui-mt-7 xui-d-flex">
                    <button className="xui-btn psc-btn-blue xui-font-sz-80">Publish</button>
                </div>
        </form>


        </div>
    </section>
    </div>
  )
}



export default CreateAnnouncement