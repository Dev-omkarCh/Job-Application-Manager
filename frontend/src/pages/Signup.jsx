// src/pages/Signup.jsx
import useSignup from "@/hooks/useSignup";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { signup, loading } = useSignup();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return toast.error("Please fill in all fields.");
    }
    signup(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
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

          <button type="submit" className={`${loading ? "loading-spinner btn-disabled" : "btn btn-primary"} w-full`}>Sign Up</button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
