import React from 'react'
import { RxCross1 } from "react-icons/rx";

const TodoApp = ({ loading, title, setTitle, content, setContent, postdata, tooglecreateNote }) => {
    return (
        <>
            <div className='px-6 md:px-12 container mx-auto flex items-center justify-center flex-col z-50 '>
                <div className="card max-w-md w-full shadow-lg rounded mt-5 p-5 bg-white relative">
                    <RxCross1 onClick={tooglecreateNote} className='text-xl absolute right-0 to-[-10px] cursor-pointer' />
                    <form onSubmit={postdata} action="">
                        <h1 className='font-semibold capitalize'>add new task</h1>
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
                        <button disabled={loading} className={`px-4 py-2 rounded-2xl  text-white capitalize text-
                        xl w-full mt-5   ${loading ? "cursor-not-allowed bg-blue-200" : "cursor-pointer bg-blue-500"}`}>
                            {loading ? "Loading..." : "Add Task"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TodoApp
