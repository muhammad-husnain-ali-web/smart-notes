import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/services";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showPwd, setShowPwd] = useState(false);
  const [isDesibledBtI, setisDesibledBtI] = useState(false);
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisDesibledBtI(true);
    if (!form.email || !form.password) {
      alert("Please fill all the fields");
      setisDesibledBtI(false);
      return;
    }
    try {
      const res = await loginUser(form);
      if (res.success) {
        alert(res.message);
        setUser({ auth: true, user: res.user });
        navigate("/");
      } else {
        alert(res.message);
      }
      setisDesibledBtI(false);
    } catch (error) {
      console.error("Error:", error);
      setisDesibledBtI(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="form p-8 w-80 lg:w-100 bg-white rounded-lg">
        <h2 className="text-4xl text-center text-green-700 font-bold mb-4 py-5">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="Email"
              className="p-3 px-12 w-full rounded-md outline-none focus:ring-2 focus:ring-green-500 border-none bg-gray-300"
            />
            <img
              className="absolute left-3 top-3"
              src="/icons/email.svg"
              alt="emailicons"
            />
          </div>

          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="Password"
              className="p-3 px-12 w-full rounded-md outline-none focus:ring-2 focus:ring-green-500 border-none bg-gray-300    "
            />
            <img
              className="absolute left-3 top-3"
              src="/icons/lock.svg"
              alt="lockicons"
            />
            <img
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-3 cursor-pointer"
              src={showPwd ? "/icons/eye-off.svg" : "/icons/eye.svg"}
              alt="eyeicons"
            />
          </div>

          <p className="px-3">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-green-500 hover:underline">
              Register
            </Link>
          </p>

          <button
            type="submit"
            className={`${isDesibledBtI ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white py-3 rounded-md transition-colors duration-300 cursor-pointer`}
            disabled={isDesibledBtI}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
