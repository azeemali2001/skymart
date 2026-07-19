import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MoveRight,
  TruckElectric,
} from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [invalidDtls, setInvalidDtls] = useState(false);
  const { setLoggedInUser } = useContext(AuthContext);

  const submitLogin = (data) => {
    
    const db = JSON.parse(localStorage.getItem("dataDb")) || [];
    
    const valid = db.find((user) => {
      return user.email === data.email && user.password === data.password;
    });

    if (valid) {
      setLoggedInUser(valid);
      localStorage.setItem('loggedInUser', JSON.stringify(valid));
      navigate("/");
      setInvalidDtls(false);
      reset();
    } else {
      setInvalidDtls(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-white p-4 lg:p-6 gap-10 lg:gap-0">
      {/* Side Bar */}

      <div className="flex flex-col gap-5 lg:w-1/2">
        <div className="flex items-center gap-4">
          <TruckElectric
            className="p-3 bg-yellow-900/30 text-yellow-300 border-yellow-600 border rounded-4xl"
            size={60}
          />
          <p className="text-2xl md:text-3xl">
            Sky<span className="text-yellow-600">Mart</span>
          </p>
        </div>
        <p className="text-yellow-full0 uppercase">Welcome Back</p>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">Shop for Future.</h1>
          <h2 className="text-yellow-600 text-2xl sm:text-3xl lg:text-4xl font-semibold">Today.</h2>
        </div>
        <div className="flex flex-col gap-1 text-gray-400 text-sm sm:text-base">
          <p>Thousands of products, lightning-fast delivery, and</p>
          <p>prices that make your wallet happy.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border w-full h-20 rounded-3xl px-5 py-3 flex flex-col items-center justify-center">
            <p className="text-yellow-full0 text-2xl">
              20<span className="text-3xl">K+</span>
            </p>
            <p className="text-gray-500">Products</p>
          </div>
          <div className="border w-full h-20 rounded-3xl px-5 py-3 flex flex-col items-center justify-center">
            <p className="text-yellow-full0 text-2xl">
              50<span className="text-3xl">K+</span>
            </p>
            <p className="text-gray-500">Users</p>
          </div>
          <div className="border w-full h-20 rounded-3xl px-5 py-3 flex flex-col items-center justify-center">
            <p className="text-yellow-full0 text-2xl">4.9★</p>
            <p className="text-gray-500">Rating</p>
          </div>
        </div>

        <div className="right"></div>
      </div>

      <div className="hidden lg:block mx-12 w-px bg-gray-700"></div>

      {/* Login */}
      <div className="flex justify-center items-center lg:w-1/2">
        <div className="w-full max-w-md border border-gray-700 bg-[#111] rounded-3xl p-6 sm:p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl sm:text-4xl font-bold">Sign In</h1>
            <p className="text-gray-400 text-sm">Enter the Credentials to continue</p>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(submitLogin)}
          >
            <div className="flex items-center gap-3 border rounded-2xl px-4 h-13 focus-within:border-yellow-600">
              <Mail size={18} className="text-gray-400" />

              <input
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            {errors.email && (
              <p className="ml-2 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
            <div className="flex items-center gap-3 border border-gray-700 rounded-2xl px-4 h-14 focus-within:border-yellow-500 transition">
              <Lock size={18} className="text-gray-400" />

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="flex-1 bg-transparent outline-none"
              />

              {showPassword ? (
                <EyeOff
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-yellow-full0"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-yellow-full0"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <p className="ml-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-yellow-300 hover:bg-yellow-500 transition text-black text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 cursor-pointer"
            >
              Sign In <MoveRight />
            </button>
            {invalidDtls && (
              <p className="ml-2 text-xs text-red-400">Email or Password is incorrect !</p>
            )}
          </form>

          <div className="flex items-center justify-center">
            <p>
              Don't have an account?{" "}
              <span
                className="text-yellow-full0 hover:text-yellow-600 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Create One
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
