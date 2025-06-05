// src/pages/Login.jsx
import useLogin from "@/hooks/useLogin";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const {loading, login } = useLogin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Please fill in all fields.");
    }
    
    login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <button type="submit" className={`${loading ? "loading-spinner btn-disabled" : "btn btn-primary"} w-full`}>Login</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
