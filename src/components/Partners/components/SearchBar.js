import React from 'react'
import search from "../assets/search.png"


function SearchBar() {
  return (
    <div className='md:block hidden'>
        <div className='relative  p-1 border border-slate-400 border-solid rounded-lg bg-slate-100'>
            <img className='absolute' src={search} alt=""/>
            <input className=' w-[180px] pl-8 outline-none bg-transparent text-sm ' type="text" name='search' placeholder='Search' />
        </div>
    </div>
  )
}

export default SearchBar
