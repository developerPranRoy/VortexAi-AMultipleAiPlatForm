import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Sidebar from "./Sidebar";


const Home = () => {
    const user = useSelector((state) => state.user.userData);
    const dispatch = useDispatch()
    console.log("Redux User:", user);
    const [, setOpen] = useState(false);

    const handleLogin = async (token) => {
        try {
            const data = await api.post("/api/auth/login", { token });
            dispatch(setUserData(data))
            console.log(data.data);
            return data
        } catch (error) {
            console.log(error);
        }
    };

    const googleLogin = async () => {
        try {
            const data = await signInWithPopup(auth, googleProvider);

            const token = await data.user.getIdToken();

            await handleLogin(token);

            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex h-screen  text-white bg-black overflow-hidden">

            <Sidebar></Sidebar>
            {/* <ChatArea></ChatArea>
            <Artifact></Artifact> */}

            {
                !user && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-[90%] max-w-md rounded-2xl bg-blue-950 p-6 shadow-2xl">


                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-bold text-white">Welcome to VortexAi</h2>
                            <p className="mt-2 text-gray-500">Login to continue</p>
                        </div>

                        <button
                            onClick={googleLogin}
                            className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            <FcGoogle size={24} />
                            Continue with Google
                        </button>
                    </div>
                </div>
            }

        </div>
    );
};

export default Home;