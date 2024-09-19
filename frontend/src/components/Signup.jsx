import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ToastContainer, toast } from "react-toastify";
import "./../App.css";
function Signup() {
  const signupRotate = useRef();
  const loginRotate = useRef();
  const tl = useRef(null);
  const tlt = useRef(null);

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    lemail: "",
    lpassword: "",
  });

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true }).to(signupRotate.current, {
      transformOrigin: "100% 100%",
      duration: 0.7,
      rotate: 180,
      ease: "sine.out",
    });

    tlt.current = gsap.timeline({ paused: true }).from(loginRotate.current, {
      transformOrigin: "0% 100%",
      duration: 0.7,
      ease: "sine.out",
      rotate: -180,
    });
  }, []);

  const handelSignupRotate = () => {
    tl.current.play();
    tlt.current.play();
  };
  const handelLoginRotate = () => {
    tl.current.reverse();
    tlt.current.reverse();
  };

  const handelChanges = (e) => {
    const { name, value } = e.target;
    const shallowCopy = { ...signupInfo };
    shallowCopy[name] = value;
    setSignupInfo(shallowCopy);
  };

  const handelFormSingupSubmit = async (e) => {
    e.preventDefault();
    if (signupInfo.name.trim().length < 4) {
      return toast("Name must be at least 4 characters!");
    }

    if (signupInfo.email.trim().length < 4) {
      return toast("Email must be at least 4 characters!");
    }

    if (signupInfo.password.trim().length < 4) {
      return toast("Password must be at least 4 characters!");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/signup", {
        method: "post",
        headers: {
          "content-type": "Application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      if (response.status == "success") {
        toast("You can login now..!");
      } else if (response.status == "fail") {
        return toast(result.message);
      }
    } catch (error) {
      return toast(error.message);
    }

    handelSignupRotate();

    setSignupInfo({
      name: "",
      email: "",
      password: "",
    });
  };

  const handelLoginChanges = (e) => {
    const { name, value } = e.target;
    const shallowCopy = { ...loginInfo };
    shallowCopy[name] = value;
    setLoginInfo(shallowCopy);
  };

  const handelFormLoginSubmit = async (e) => {
    e.preventDefault();
    if (
      loginInfo.email.trim().length <= 0 ||
      loginInfo.password.trim().length <= 0
    ) {
      return toast("Enter the details correctly..!");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      if (result.status == "success") {
        toast("You are loggedIn..!");
        handelLoginRotate();
      } else if (result.status == "fail") {
        return toast(result.message);
      }
    } catch (error) {
      return toast(error.message);
    }
  };

  return (
    <>
      <div className="container flexer ">
        <div className=" shadow-xl relative overflow-hidden  w-[45%] h-[400px]">
          <div ref={signupRotate} className="signup absolute w-full h-full ">
            <form
              onSubmit={handelFormSingupSubmit}
              className="flex h-full bg-slate-100 "
            >
              <div className="h-[100%] w-[25%] bg-[#FF6600] flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-white">Sign UP</h1>
              </div>
              <div className="px-5 flex-col gap-5 py-5 flex w-[75%]">
                <div className="flex justify-between gap-2 w-full ">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold text-xl">
                      First-Name:
                    </label>
                    <input
                      value={signupInfo.name}
                      onChange={handelChanges}
                      className="px-3 py-1 placeholder:py-3 placeholder:text-[16px] placeholder:italic"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Your Name.."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="last-name"
                      className="font-semibold text-xl"
                    >
                      Last-Name:
                    </label>
                    <input
                      className="px-3 py-1 placeholder:py-3 placeholder:text-[16px] placeholder:italic"
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Enter Your Name.."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-semibold text-xl">
                    Email:
                  </label>
                  <input
                    onChange={handelChanges}
                    value={signupInfo.email}
                    className="px-3 py-2 placeholder:py-3 placeholder:text-[16px] placeholder:italic"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email.."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="font-semibold text-xl">
                    Password:
                  </label>
                  <input
                    onChange={handelChanges}
                    value={signupInfo.password}
                    className="px-3 py-2 placeholder:py-3 placeholder:text-[16px] placeholder:italic"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password.."
                  />
                </div>

                <div className="inline-block text-center">
                  <button
                    type="submit"
                    className="bg-[#FF6600] button px-3 py-2 text-xl font-semibold text-white relative "
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            ref={loginRotate}
            className="login absolute w-full h-full bg-red-400 "
          >
            <form
              onSubmit={handelFormLoginSubmit}
              className="flex h-full bg-slate-100 "
            >
              <div className="h-[100%] w-[25%] bg-[#FF6600] flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-white">Log In</h1>
              </div>
              <div className="px-5 flex-col gap-5 py-5 flex w-[75%]">
                <div className="flex flex-col gap-2">
                  <label htmlFor="lemail" className="font-semibold text-xl">
                    Email:
                  </label>
                  <input
                    onChange={handelLoginChanges}
                    value={loginInfo.email}
                    className="px-3 py-2 placeholder:py-3 placeholder:text-[16px] placeholder:italic"
                    type="email"
                    id="lemail"
                    name="lemail"
                    placeholder="Enter Your Email.."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lpassword" className="font-semibold text-xl">
                    Password:
                  </label>
                  <input
                    onChange={handelLoginChanges}
                    value={loginInfo.password}
                    className="px-3 py-2 placeholder:py-3 placeholder:text-[16px] placeholder:italic"
                    type="password"
                    id="lpassword"
                    name="lpassword"
                    placeholder="Enter Your Password.."
                  />
                </div>

                <div className="inline-block text-center">
                  <button
                    type="submit"
                    className="bg-[#FF6600] button px-3 py-2 text-xl font-semibold text-white relative "
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>

            <button onClick={handelLoginRotate}>Login</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
