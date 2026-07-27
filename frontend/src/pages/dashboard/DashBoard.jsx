import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Searching from "../../components/Searching";
import TodoApp from "../../components/TodoApp";
import DeleteModel from "../../components/DeleteModel";
import EditTodo from "../../components/EditTodo";
import DisplayData from "../../components/DisplayData";
import Header from "./Header";
;

export default function DashBoard() {
    const [loading, setLoading] = useState(false)
    const [searchloading, setSearchLoading] = useState(false)
    const [createTask, setCreateTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editData, setEditData] = useState(null)
    const [editModal, setEditModal] = useState(false);
    const [searchTask, setSearchTask] = useState("");
    const [deletemodel, setDeleteModel] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const api = import.meta.env.VITE_BACKEND_URL;
    // delete
    const handelDeletepopUp = () => {
        setDeleteModel(!deletemodel)
    }
    const fetchTasks = async () => {
        setLoading(true)
        try {
            let taskData = await fetch(`${api}/task/alltasks`, {
                credentials: "include"
            });
            let res = await taskData.json();
            setLoading(false);
            setTasks(res.data)
        } catch (error) {
            console.log("error", error);
        }
    }
    const tooglecreateNote = () => {
        setCreateTask(!createTask)
    }

    const tooglepoupu = () => {
        setEditModal(!editModal)
    }
    // post data logic here
    const postdata = async (e) => {
        e.preventDefault()
        const createTask = {
            title,
            content
        };
        if (!title) {
            toast.error(" this filled is required !")
            return
        }
        if (!content) {
            toast.error(" this Description filled is required !")
            return
        }
        setLoading(true)
        try {
            const data = await axios.post(`${api}/task/createtask`, createTask, {
                withCredentials: true
            });
            console.log("task add data here", data);
            toast.success("Task add successfully")
            setCreateTask(false);
            fetchTasks()
            setContent('');
            setTitle('')
            setLoading(false)
        } catch (error) {
            console.log("error", error);
        }
    }
    // delete logic here...
    const deleteTask = async (id) => {

        setDeleteId(id)
        setDeleteModel(true)
    }
    const confirmDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`${api}/task/deletetask/${deleteId}`, { withCredentials: true })
            toast.success("Task delete successfully")
            handelDeletepopUp()
            fetchTasks()
            setLoading(false)
        } catch (error) {
            toast.error(error)
        }
        finally {
            setLoading(false)
        }
    }


    const updateedTask = async (id) => {
        const res = await axios.get(`${api}/task/gettask/${id}`, { withCredentials: true });
        console.log("edit data", res.data.data);
        setEditModal(true);
        setEditData(res.data.data)
    }

    // complete task logic here
    const markCompleteTask = async (id) => {
        alert("Task ID: " + id);
        console.log("Task ID:", id);
    };



    useEffect(() => {
        fetchTasks();
    }, [])

    return (
        <>
            <main className="relative w-full ">
                <Header />
                <section className=" bg-gray-100 p-6 relative min-h-screen  overflow-hidden ">
                    <div className="flex items-center justify-between">
                        <h1 className='font-semibold  text-2xl capitalize'>task List app</h1>
                        <button onClick={tooglecreateNote} className='px-4 py-2 bg-green-500 mb-3.5 text-white rounded-2xl capitalize cursor-pointer'>
                            Add New Task
                        </button>
                    </div>
                    <div className={`absolute w-full h-full z-50 ${createTask ? "top-[50%]" : "top-[-60%]"} left-1/2 transform  -translate-x-1/2 -translate-y-1/2 duration-150 transition-all`}>
                        <TodoApp loading={loading} title={title} setTitle={setTitle} content={content} setContent={setContent} postdata={postdata} tooglecreateNote={tooglecreateNote} />
                    </div>
                    <div className={` w-full h-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  duration-150 ${deletemodel ? "scale-[1.2]" : "scale-0"} `}>
                        <DeleteModel confirmDelete={confirmDelete} loading={loading} handelDeletepopUp={handelDeletepopUp} />
                    </div>
                    <div className={`absolute w-full h-full    ${editModal ? "top-1/2" : "top-[-60%]"} left-1/2 transform  -translate-x-1/2 -translate-y-1/2 duration-150 transition-all`}>
                        <div className="relative z-50">
                            <EditTodo tooglepoupu={tooglepoupu} editData={editData} fetchTasks={fetchTasks} />
                        </div>
                    </div>
                    <DisplayData loading={loading} searchloading={searchloading} markCompleteTask={markCompleteTask} tasks={tasks} updateedTask={updateedTask} deleteTask={deleteTask} />
                </section>
            </main>
        </>
    );
}
