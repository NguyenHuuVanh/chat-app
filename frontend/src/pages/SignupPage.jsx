import { ShipWheel } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import images from "../assets/images";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignup();

  const handleChangeSignupData = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-solid border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}

        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col mb-4">
          {/* logo */}
          <div className="mb-4 flex flex-center items-center gap-2">
            <ShipWheel className="size-9 flex items-center text-primary" />
            <h1 className="text-center text-4xl font-bold font-poppin bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
              Streamify
            </h1>
          </div>

          {/* Error message if any */}
          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <div className="flex flex-row items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                  />
                </svg>
                <span>{error.response.data.message}</span>
              </div>
            </div>
          )}

          {/* form */}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold font-poppin text-white">Create an accout</h2>
                  <p className="text-sm opacity-70">Join Streamify and start your language learning adventure!</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* fullname */}
                <div className="form-cotrol w-full">
                  <label className="label mb-2">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your FullName"
                    className="input input-bordered w-full"
                    value={signupData.fullName}
                    onChange={handleChangeSignupData}
                    required
                  />
                </div>

                {/* email */}
                <div className="form-cotrol w-full">
                  <label className="label mb-2">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={signupData.email}
                    onChange={handleChangeSignupData}
                    required
                  />
                </div>

                {/* password */}
                <div className="form-cotrol w-full">
                  <label className="label mb-2">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    value={signupData.password}
                    onChange={handleChangeSignupData}
                    required
                  />
                  <p>
                    <span className="text-sm opacity-70 mt-1">Password must be at least 6 characters long</span>
                  </p>
                </div>

                {/* terms and conditions */}
                <div className="form-cotrol w-full">
                  <label className="label cursor-pointer jutify-start gap-2 my-3">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-sx leading-tight"></span>i agree to the
                    <a href="#" className="link link-primary text-primary hover:underline no-underline">
                      terms and services
                    </a>{" "}
                    and
                    <a href="#" className="link link-primary text-primary hover:underline no-underline">
                      privacy policy
                    </a>
                  </label>
                </div>

                {/* submit button */}
                <div className="form-control w-full">
                  <button type="submit" className="btn btn-primary w-full text-white">
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Loading...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>

                {/* already have an account */}
                <div className="form-control w-full">
                  <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary text-primary hover:underline no-underline">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={images.logo} alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
