import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Cross } from 'lucide-react';
import { RxCross1 } from "react-icons/rx";

const EditTodo = ({ tooglepoupu, editData, fetchNotesData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const api = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        if (editData) {
            setTitle(editData.title)
            setContent(editData.content)
        }
    }, [editData]);

    // update data logic here...
    const updateTask = async (e) => {
        e.preventDefault();
        if (!title) {
            toast.error(" title is required !")
        }
        setLoading(true)
        try {
            const update = { title, content };
            await axios.put(`${api}/task/edittask/${editData._id}`, update, { withCredentials: true });
            toast.success("Task Update Success fully !")
            setLoading(false)
            fetchNotesData()
            tooglepoupu()
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <div className='px-6 md:px-12 container mx-auto flex items-center justify-center flex-col z-50 '>
                <div className="card max-w-md w-full shadow-lg rounded mt-5 p-5 bg-white relative">
                    <RxCross1 onClick={tooglepoupu} className='text-xl absolute right-0 to-[-10px] cursor-pointer' />
                    <form onSubmit={updateTask} action="">
                        <h1 className='font-semibold capitalize'>Update Task</h1>
                        <div className="input- mt-5">
                            <label htmlFor="">Task title</label>
                            <input type='text' placeholder='plase Enter Your Task' className='px-3 py-2 rounded shadow w-full mt-5 '
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-filled mt-5">
                            <label htmlFor="">Description</label>
                            <textarea rows={8} cols={25} className='px-3 py-2 rounded shadow w-full mt-5'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='flex gap-3.5'>
                            <button onClick={tooglepoupu} type='button' className='px-4 py-2 rounded-2xl bg-red-500 text-white capitalize text-
                        xl w-full mt-5 cursor-pointer '>colse</button>
                            <button type='submit' disabled={loading} className={`px-4 py-2 rounded-2xl bg-blue-500 text-white capitalize text-
                        xl w-full mt-5 cursor-pointer  ${loading ? "cursor-not-allowed" : ""}`}>
                                {loading ? "Loading..." : "Updated Task"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditTodo
