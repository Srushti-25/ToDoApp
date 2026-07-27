import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
const RegisterUI = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPasword, setShowPassword] = useState(false)
    const { registerUser, success, loading, error } = useContext(AuthContext)

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("all fieds is required");
            return
        }

        const data = await registerUser({ name, email, password });
        if (data) {
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login")
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full ">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Register
                </h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-3 px-2 py-3 shadow-md rounded border"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 px-2 py-3 shadow-md rounded border"
                    />
                    <div className="w-full relative">
                        <input
                            type={showPasword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mb-4 px-2 py-3 shadow-md rounded border "
                        />
                        <button onClick={() => setShowPassword(!showPasword)} type="button" className="absolute right-4 top-2.5 cursor-pointer">
                            {!showPasword
                                ? <EyeOff /> :
                                <Eye />
                            }
                        </button>
                    </div>

                    {
                        success && <div className="px-4 py-3 bg-green-300 rounded-2xl">
                            <p className="text-green-500 text-sm mb-2">{success}</p>
                        </div>
                    }
                    {error && (
                        <div className="px-4 py-3 bg-red-300 rounded-2xl">
                            <p className="text-red-500 text-sm mb-2">{error}</p>
                        </div>
                    )}
                    <button type="submit"
                        disabled={loading}
                        className={`w-full mt-5    py-2 rounded  disabled:opacity-50 ${!loading ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" : "bg-gray-400 text-black cursor-not-allowed"}`}         >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <h1 className="font-semibold mt-2 capitalize">already have a account ? <Link to={`/login`} className="underline text-bg-500">login now</Link></h1>
            </div>
        </div>
    );
};

export default RegisterUI;
