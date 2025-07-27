import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axiosinstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute w-72 h-72 bg-cyan-100 rounded-full top-[-80px] right-[-100px] opacity-50 blur-2xl z-0" />
      <div className="absolute w-96 h-96 bg-cyan-200 rounded-full bottom-[-120px] left-[-100px] opacity-40 blur-2xl z-0" />

      <div className="container mx-auto h-screen flex flex-col md:flex-row items-center justify-center px-6 relative z-10">
        {/* Left: Hero Section */}
        <div className="w-full md:w-1/2 h-[90vh] bg-login-bg-img bg-cover bg-center rounded-xl p-10 flex items-end justify-start">
          <div>
            <h2 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
              Capture your <br /> Journeys !!
            </h2>
            <p className="text-white text-base mt-4 pr-6">
              Every journey, a story worth saving.
            </p>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 bg-white h-auto md:h-[75vh] rounded-xl md:rounded-l-none shadow-2xl p-8 md:p-16 flex items-center justify-center">
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">
              Login
            </h3>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              className="w-full px-4 py-3 mb-4 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-400 outline-none transition"
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && (
              <p className="text-red-600 text-sm mt-2 mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              LOGIN
            </button>

            <div className="my-4 text-center text-slate-500 text-sm">Or</div>

            <button
              type="button"
              onClick={() => navigate("/SignUp")}
              className="w-full bg-white border border-cyan-400 text-cyan-500 hover:bg-cyan-50 font-semibold py-3 rounded-md transition duration-300"
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
