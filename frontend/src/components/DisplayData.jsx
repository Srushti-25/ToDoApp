import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DisplayData = ({ tasks, deleteTask, updateedTask, markCompleteTask }) => {

    return (
        <>
            <div className='task-data-list mt-10 z-40'>
                <div className='item '>
                    <div className=' flex items-center justify-between  flex-col gap-3'>
                        {
                            tasks.length === 0 ? (
                                <div className='bg-gray-300 animate-pulse
 w-full mx-w-md shadow rouned p-5 rounded-2xl flex items-center justify-between h-28'>
                                </div>
                            ) :
                                tasks.map((item) => {
                                    const { title, content, status, createdAt } = item
                                    return (
                                        <div key={item._id} className='bg-white w-full mx-w-md shadow rouned p-5 rounded-2xl flex items-center justify-between'>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <h1 className={`font-semibold capitalize text-xl ${status === "Complete" ? "line-through" : ""}`}>{title}</h1>
                                                </div>
                                                <p className=' mt-5'>
                                                    {new Date(createdAt).toLocaleString("en-IN")}
                                                </p>
                                                <p className='text-sm font-semibold'>{content}</p>
                                            </div>
                                            <div className="actions flex items-center gap-1.5">
                                                <button onClick={() => updateedTask(item._id)} className='px-4 py-2 bg-blue-500 text-white rounded-2xl capitalize cursor-pointer'>
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => markCompleteTask(item._id)} className='px-4 py-2 bg-green-500 text-white rounded-2xl capitalize cursor-pointer'>
                                                    complete this task
                                                </button>
                                                <button onClick={()=>deleteTask(item._id)} className='px-4 py-2 bg-red-500 text-white rounded-2xl capitalize cursor-pointer'>
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayData
