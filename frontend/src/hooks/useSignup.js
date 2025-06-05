import useAuthStore from "@/store/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () =>{
    const [ loading,setloading ] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuthStore();

    const signup = async({ name, email, password}) =>{

        setloading(true);
        const success = validation(name, email, password);
        if(!success) return setloading(false);

        try{
            const res = await fetch(`/api/auth/signup`,{
                method : "POST",
                headers : { "Content-Type": "application/json"},
                body : JSON.stringify({ fullName : name, email, password })
            });
            const data = await res.json();
            if(data.error) return toast.error(data.error);

            // localStorage
            localStorage.setItem("authUser",JSON.stringify(data));

            //context
            setAuthUser(data);
            navigate("/home");
        }
        catch(e){
            toast.error(e.message);
        }
        finally{
            setloading(false);
        }
    };
    return { loading, signup };
};

function validation( name, email, password){
    if(!name || !password || !email ){
        toast.error("Please fill in all Fields");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must be atleast 6 characters");
        return false;
    }
    return true;
};

export default useSignup;