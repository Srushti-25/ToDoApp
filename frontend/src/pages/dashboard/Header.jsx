import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Header = () => {
    const { logOutUser, user } = useContext(AuthContext);

    // handelLogout
    const handelLogout = () => {
        const confirm = window.confirm("Are U Sure U Went To Log out!")
        if (confirm) {
            logOutUser();
            toast.success(`${user.name} log out successfully`)
        }
    }
    const [isopen, setIsOpen] = useState(false)
    const toggleMode = () => {
        setIsOpen(!isopen)
    }
    return (
        <>
            <header className='w-full flex items-center justify-between p-5 shadow-md bg-white'>
                <div>
                    <h1 className='font-semibold capitalize'>MyTask</h1>
                </div>
                <div className='flex items-center justify-center gap-1.5 flex-col'>
                    <div onClick={toggleMode} className='user-icon w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center relative group cursor-pointer hover:bg-gray-400 duration-150'>
                        <User className='text-2xl' />
                    </div>
                    <div className={`flex  items-center justify-center gap-1.5 flex-col absolute w-[200px] top-[15%] z-30 py-4 px-2 right-6 bg-white shadow-lg  ${isopen ? "" : "hidden"}`}>
                        <div className='p-2  hover:bg-gray-300 rounded-2xl' >
                            <p className='font-semibold capitalize '>wellcome , {user.name}</p>
                        </div>
                        <button onClick={handelLogout} className='py-2 px-3 rounded-2xl bg-red-600 text-white capitalize cursor-pointer hover:bg-red-900 duration-300'>logout</button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
