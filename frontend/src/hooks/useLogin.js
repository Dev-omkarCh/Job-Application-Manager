import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/auth';

const useLogin = () => {

    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuthStore();
    
    const login = async({ email, password }) => {

        setLoading(true);
        const success = validation( email, password );
        if(!success) return setLoading(false);

        try{
            const res = await fetch(`/api/auth/login`,{
                method : "POST",
                headers : { "Content-Type": "application/json"},
                body : JSON.stringify({ email, password })
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
            setLoading(false);
        }
    }
  return { login, loading }
}

function validation( username, password){
    if(!username || !password){
        toast.error("Please fill in all Fields");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must be atleast 6 characters");
        return false;
    }
    return true;
};

export default useLogin;
