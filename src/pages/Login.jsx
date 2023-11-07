import React, { useEffect, useState } from "react"
import { twitter, github, linkedin, discord, apple } from "../assets"
// import { GoogleOAuthProvider } from "@react-oauth/google"
// import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"

const Login = ({ setUser }) => {
  const navigate = useNavigate()

  const handleCallbackResponse = (response) => {
    const userDecoded = jwt_decode(response.credential)
    console.log(userDecoded)
    setUser(userDecoded)
    navigate("/dashboard")
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1054827297482-rv2mce3db7n29uf037v75uvbbbq6gdiu.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    })
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "extraLarge",
    })
    google.accounts.id.prompt()
  }, [])

  return (
    <div className="h-screen w-full bg-[#F8FAFF] flex">
      {/* using aside tag for the left side of the page */}
      <aside className="home_background w-[50%] h-screen bg-[#4285f4] flex flex-col justify-between visible max-lg:hidden">
        <div className="font-bold text-[24px] text-white pl-14 pt-10">LOGO</div>
        <main className="pl-72 text-[72px] text-white font-bold max-md:hidden">
          <h1>Board.</h1>
        </main>
        <footer className="flex gap-10 pb-10 items-center pl-64">
          <img src={github} alt="socials" className="w-[50px] h-[50px]" />
          <img src={twitter} alt="socials" className="w-[50px] h-[50px]" />
          <img src={linkedin} alt="socials" className="w-[50px] h-[50px]" />
          <img src={discord} alt="socials" className="w-[50px] h-[50px]" />
        </footer>
      </aside>
      {/* normal sign in section , right side of the page */}
      <div className="max-lg:w-full w-[50%] h-screen lg:flex lg:flex-col lg:items-start lg:justify-center lg:pl-36 space-y-12 grid place-items-center">
        <div>
          <h1 className="text-[32px] font-bold">Sign In</h1>
          <p>sign in to your account</p>
        </div>

        <div className="flex max-lg:flex-col justify-around max-lg:items-center w-2/3 gap-10">
          <div id="signInDiv" />
          <div className="flex justify-center items-center border border-gray-300 bg-white gap-4 rounded-md cursor-pointer w-[250px] h-[40px]">
            <img src={apple} alt="apple_logo" />
            <p>Sign in with Apple</p>
          </div>
        </div>
        <form className="bg-white rounded-xl flex flex-col gap-10 py-10 md:w-2/3 px-10">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[20px]">
              Email address
            </label>
            <input
              type="email"
              required
              name="email"
              placeholder="enter your email address"
              className="bg-gray-200 pl-4 h-10 outline-none rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[20px]">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="enter your password"
              className="bg-gray-200 pl-4 h-10 outline-none rounded-lg"
            />
          </div>
          <div>
            <a className="text-blue-600 underline cursor-pointer" href="#">
              Forgot password?
            </a>
          </div>
          <div>
            <Link to="/dashboard">
              <button className="btn bg-[#4285F4] w-full text-[24px] text-white font-semibold rounded-lg">
                Sign In
              </button>
            </Link>
          </div>
        </form>
        <div className="text-center md:w-2/3">
          Don't have an account&nbsp;&nbsp;
          <a className="text-blue-600 underline cursor-pointer" href="#">
            Register here
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
