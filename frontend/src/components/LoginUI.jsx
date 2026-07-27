

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginUI = () => {
    const { loginUser, success, loading, error } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showPasword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("all fieds is required");
            return
        }
        const user = await loginUser({ email, password });
        console.log("user", user);
        if (user) {
            setEmail("");
            setPassword("")
            navigate(`/dashboard`)
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full ">
                <form onSubmit={handleLogin}>
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Login
                    </h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 px-2 py-3 shadow-md rounded border focus:ring-green-400"
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
                    {error && (
                        <div className="px-4 py-3 bg-red-300 rounded-2xl">
                            <p className="text-red-500 text-sm mb-2">{error}</p>
                        </div>
                    )}
                    <button type="submit" className="w-full mt-5 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                        {
                            loading ? "loging..." : "Login"
                        }
                    </button>



                </form>

                <h1 className="font-semibold mt-2 capitalize">no account ? <Link to={`/`} className="underline text-bg-500">create now</Link></h1>
            </div>
        </div>
    );
};

export default LoginUI;
