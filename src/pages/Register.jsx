import { Eye, EyeOff, Lock, Mail, MoveRight, User } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setLoggedInUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const password = watch("password");

  const [alreadyExist, setAlreadyExist] = useState(false);

  const submitRegister = (data) => {
    const user = data;

    const db = JSON.parse(localStorage.getItem("dataDb")) || [];
    const isExist = db.find((u) => {
      return u.email === user.email;
    });

    if (!isExist) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      const updatedDb = [...db, user];
      localStorage.setItem("dataDb", JSON.stringify(updatedDb));
      setLoggedInUser(user);
      navigate("/");
      reset();
    } else {
      setAlreadyExist(true);
    }
  };

  return (
    <div className="flex text-white p-6">
      {/* Register Form */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[430px] border border-gray-700 rounded-3xl p-8 flex flex-col gap-8 bg-[#111]">
          <div>
            <h1 className="text-4xl font-bold">Create Account</h1>

            <p className="text-gray-500 mt-2">
              Join SkyMart and start shopping.
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitRegister)}
          >
            {/* Name */}
            <div
              className={`flex items-center gap-3 border rounded-2xl px-4 h-14 transition
                        ${
                          errors.name
                            ? "border-red-500 focus-within:border-red-500"
                            : "border-gray-700 focus-within:border-yellow-500"
                        }`}
            >
              <User
                size={18}
                className={errors.name ? "text-red-400" : "text-gray-400"}
              />

              <input
                {...register("name", {
                  required: "Name is Required",
                  minLength: {
                    value: 4,
                    message: "Too Short name",
                  },
                  maxLength: {
                    value: 20,
                    message: "Too Large name",
                  },
                })}
                type="text"
                placeholder="Full Name"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            {errors.name && (
              <p className="ml-2 text-xs text-red-400">{errors.name.message}</p>
            )}
            {/* Email */}
            <div className="flex items-center gap-3 border border-gray-700 rounded-2xl px-4 h-14 focus-within:border-yellow-500 transition">
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
            {/* Password */}
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
                  className="cursor-pointer text-gray-400 hover:text-yellow-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-yellow-400"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <p className="ml-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
            {/* Confirm Password */}
            <div className="flex items-center gap-3 border border-gray-700 rounded-2xl px-4 h-14 focus-within:border-yellow-500 transition">
              <Lock size={18} className="text-gray-400" />

              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="flex-1 bg-transparent outline-none"
              />

              {showConfirmPassword ? (
                <EyeOff
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-yellow-400"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-yellow-400"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="ml-2 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
            {/* Button */}
            <button
              type="submit"
              className="mt-3 h-14 rounded-2xl bg-yellow-300 hover:bg-yellow-500 transition-all duration-300 text-black text-lg font-semibold flex items-center justify-center gap-3 cursor-pointer"
            >
              Create Account
              <MoveRight size={20} />
            </button>
            {alreadyExist && (
              <p className="ml-2 text-xs text-red-400">Email is already Registered</p>
            )}
          </form>

          {/* Footer */}
          <div className="flex justify-center">
            <p className="text-gray-400">
              Already have an account?
              <span
                className="ml-2 text-yellow-400 hover:text-yellow-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
