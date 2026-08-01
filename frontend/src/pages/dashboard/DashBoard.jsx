import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TodoApp from "../../components/TodoApp";
import DeleteModel from "../../components/DeleteModel";
import EditTodo from "../../components/EditTodo";
import DisplayData from "../../components/DisplayData";
import Header from "./Header";

export default function DashBoard() {
    const [loading, setLoading] = useState(false);
    const [searchloading, setSearchLoading] = useState(false);
    const [createTask, setCreateTask] = useState(false);

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [editData, setEditData] = useState(null);
    const [editModal, setEditModal] = useState(false);

    const [deletemodel, setDeleteModel] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const api = import.meta.env.VITE_BACKEND_URL;


    const getToken = () => {
        return localStorage.getItem("token");
    };


    const authConfig = () => ({
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        withCredentials: true,
    });


    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${api}/task/alltasks`,
                authConfig()
            );

            setTasks(response.data.data || []);

        } catch (error) {
            console.log(error);

            setTasks([]);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch tasks"
            );

        } finally {
            setLoading(false);
        }
    };


    // Toggle create modal
    const tooglecreateNote = () => {
        setCreateTask(!createTask);
    };


    // Toggle edit modal
    const tooglepoupu = () => {
        setEditModal(!editModal);
    };


    // Create Task
    const postdata = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!content.trim()) {
            toast.error("Content is required");
            return;
        }


        try {

            setLoading(true);

            await axios.post(
                `${api}/task/createtask`,
                {
                    title,
                    content
                },
                authConfig()
            );


            toast.success("Task created successfully");


            setTitle("");
            setContent("");

            setCreateTask(false);

            fetchTasks();


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Task creation failed"
            );

        } finally {

            setLoading(false);

        }
    };


    // Open delete popup
    const deleteTask = (id) => {

        setDeleteId(id);
        setDeleteModel(true);

    };


    const handelDeletepopUp = () => {

        setDeleteModel(!deletemodel);

    };


    // Confirm delete
    const confirmDelete = async () => {

        try {

            setLoading(true);


            await axios.delete(
                `${api}/task/deletetask/${deleteId}`,
                authConfig()
            );


            toast.success("Task deleted successfully");


            setDeleteModel(false);

            fetchTasks();


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        } finally {

            setLoading(false);

        }

    };



    // Get task for edit
    const updateedTask = async (id) => {

        try {

            const response = await axios.get(
                `${api}/task/gettask/${id}`,
                authConfig()
            );


            setEditData(response.data.data);

            setEditModal(true);


        } catch(error){

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch task"
            );

        }

    };



    // Mark complete
    const markCompleteTask = async (id)=>{

        try{

            await axios.put(
                `${api}/task/status/${id}`,
                {
                    status:"Complete"
                },
                authConfig()
            );


            toast.success("Task completed");

            fetchTasks();


        }catch(error){

            toast.error(
                error.response?.data?.message ||
                "Status update failed"
            );

        }

    };



    useEffect(()=>{

        fetchTasks();

    },[]);



    return (

        <main className="relative w-full">

            <Header />


            <section className="bg-gray-100 p-6 relative min-h-screen overflow-hidden">


                <div className="flex items-center justify-between">

                    <h1 className="font-semibold text-2xl capitalize">
                        Task List App
                    </h1>


                    <button
                        onClick={tooglecreateNote}
                        className="px-4 py-2 bg-green-500 text-white rounded-2xl"
                    >
                        Add New Task
                    </button>


                </div>



                <TodoApp
                    loading={loading}
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    postdata={postdata}
                    tooglecreateNote={tooglecreateNote}
                />



                <DeleteModel
                    confirmDelete={confirmDelete}
                    loading={loading}
                    handelDeletepopUp={handelDeletepopUp}
                />



                <EditTodo
                    tooglepoupu={tooglepoupu}
                    editData={editData}
                    fetchTasks={fetchTasks}
                />



                <DisplayData
                    loading={loading}
                    searchloading={searchloading}
                    markCompleteTask={markCompleteTask}
                    tasks={tasks}
                    updateedTask={updateedTask}
                    deleteTask={deleteTask}
                />


            </section>


        </main>

    );
}