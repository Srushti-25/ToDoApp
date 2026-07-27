
import React from 'react'
const Searching = ({ searchTask, handleTask, handleOnChange }) => {



  return (
    <>
      <div className='w-full  shadow-lg h-[20vh] p-5  bg-white rounded-2xl'>
        <div className='w-full flex items-center justify-center gap-4'>
          <input type='text' className='px-3 py-2 rounded shadow w-[70%] mt-5 ' value={searchTask} onChange={handleOnChange} placeholder='search here...' />
          <button className='px-4 py-2  mt-5 bg-green-500 mb-3.5 text-white rounded-2xl capitalize cursor-pointer' onClick={handleTask}>search</button>
        </div>
      </div>
    </>
  )
}

export default Searching
