"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  upperCase: false,
  lowerCase: false,
  specialChar: false,
  number: false,
  length: [],
};

export default function Registration() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(initialState);

  // if (password.length > 0) {
  //   const CapitalTest = upperCase.test(password);
  //   if (CapitalTest) {
  //     setPasswordMatch((prev) => {
  //       console.log(prev);
  //       return {
  //         ...prev,
  //         upperCase: true,
  //         length: [...prev.length, 1],
  //       };
  //     });
  //   }

  //   const lowerCaseTest = LowerCase.test(password);
  //   if (lowerCaseTest) {
  //     setPasswordMatch((prev) => {
  //       return {
  //         ...prev,
  //         lowerCase: true,
  //         length: [...prev.length, 1],
  //       };
  //     });
  //   }

  //   const specialCharTest = specialChar.test(password);
  //   if (specialCharTest) {
  //     setPasswordMatch((prev) => {
  //       return {
  //         ...prev,
  //         specialChar: true,
  //         length: [...prev.length, 1],
  //       };
  //     });
  //   }

  //   const numberTest = number.test(password);
  //   if (numberTest) {
  //     setPasswordMatch((prev) => {
  //       return {
  //         ...prev,
  //         number: true,
  //         length: [...prev.length, 1],
  //       };
  //     });
  //   }
  // }
  // if (password.length > 7) {
  //   const passwordRegex = isValidPassword(password);
  //   console.log(passwordRegex);
  // }

  // console.log(passwordMatch);

  const handleRegistration = async (event) => {
    event.preventDefault();
    const formdata = event.target;
    const name = formdata.name.value;
    const phone = formdata.phone.value;
    const password = formdata.password.value;
    const confirmPassword = formdata.confirmPassword.value;

    if (!name || !phone || !password || !confirmPassword) {
      return toast.error("Please filles all information!");
    }

    if (password !== confirmPassword) {
      return toast.error("Password do not match!");
    }

    const data = {
      name,
      phone,
      password,
    };

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      formdata.reset();
      toast.success(result.message);
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* <!-- Header with gradient background --> */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-blue-100 mt-1">Join our community today</p>
        </div>

        {/* <!-- Form container --> */}
        <div className="p-8">
          <form
            id="signupForm"
            onSubmit={handleRegistration}
            className="space-y-6"
          >
            {/* <!-- Name Field --> */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="input-field pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                  required
                />
              </div>
              <p id="nameError" className="mt-1 text-sm text-red-600 hidden">
                Please enter a valid name
              </p>
            </div>

            {/* <!-- Phone Field --> */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(012) 3456-7890"
                  className="input-field phone-input pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                  required
                />
              </div>
              <p id="phoneError" className="mt-1 text-sm text-red-600 hidden">
                Please enter a valid phone number
              </p>
            </div>

            {/* <!-- Password Field --> */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                  required
                />
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                  id="togglePassword"
                  className="password-toggle absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {/* <!-- Password strength meter --> */}
              <div className="mt-2 flex space-x-1">
                <div
                  id="strength-1"
                  className="password-strength w-1/4 bg-gray-200 rounded"
                ></div>
                <div
                  id="strength-2"
                  className="password-strength w-1/4 bg-gray-200 rounded"
                ></div>
                <div
                  id="strength-3"
                  className="password-strength w-1/4 bg-gray-200 rounded"
                ></div>
                <div
                  id="strength-4"
                  className="password-strength w-1/4 bg-gray-200 rounded"
                ></div>
              </div>
              <p
                id="passwordError"
                className="mt-1 text-sm text-red-600 hidden"
              >
                Password must be at least 8 characters
              </p>
              <p id="passwordTips" className="mt-1 text-xs text-gray-500">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>

            {/* <!-- Confirm Password Field --> */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                  required
                />
                <button
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  type="button"
                  id="toggleConfirmPassword"
                  className="password-toggle absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500"
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {password.length > 7 && confirmPassword.length > 7 && (
                <p
                  id="confirmPasswordError"
                  className={`mt-1 text-sm text-red-600 ${
                    password !== confirmPassword ? "block" : "hidden"
                  }`}
                >
                  Passwords don't match
                </p>
              )}
            </div>

            {/* <!-- Terms and Conditions -->
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div> */}

            {/* <!-- Submit Button --> */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* <!-- Divider --> */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* <!-- Social Login Buttons --> */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition duration-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="#4285F4"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition duration-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="#1877F2"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* <!-- Login Link --> */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
