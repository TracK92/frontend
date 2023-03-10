import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../Api/axios";

// import { registerUser } from "../../Redux/registerUserSlice";

// import "./register.css";

const Register = () => {
  // const dispatch = useDispatch();
  // const { user, status } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const REGISTER_URL = "/register";

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    setResponse("")
  }, [name, password, confirmPassword])

  // handle status change
  // useEffect(() => {
  //   if (status === "loading") {
  //     setResponse("Loading...");
  //   } else if (status === "success") {
  //     setResponse(`User ${name} created successfully. Login to continue...`);
  //     setName("");
  //     setPassword("");
  //     setConfirmPassword("");
  //     setSuccess(true);
  //   } else if (status === "failed") {
  //     setResponse(`User ${name} already exists. Please try another name.`);
  //   }
  // }, [status]);

  // handle form submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newUser = {
  //     user: name,
  //     pwd: password,
  //   };
  //   if (!PWD_REGEX.test(password)) {
  //     setResponse(
  //       "Password must be 8-24 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  //     );
  //   } else if (password !== confirmPassword) {
  //     setResponse("Passwords do not match");
  //   } else {
  //     dispatch(registerUser(newUser));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PWD_REGEX.test(password)) {
      setResponse(
        "Password must be 8-24 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    } else if (password !== confirmPassword) {
      setResponse("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user: name, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setName("");
      setPassword("");
      setConfirmPassword("");
      // if (!PWD_REGEX.test(password)) {
      //   setResponse(
      //     "Password must be 8-24 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      //   );
      // } else if (password !== confirmPassword) {
      //   setResponse("Passwords do not match");
      // } else {
      //   console.log(JSON.stringify(response?.data));
      //   setSuccess(true);
      //   setName("");
      //   setPassword("");
      //   setConfirmPassword("");
      // }
    } catch (error) {
      if (!error.response) {
        setResponse("No response from server");
      } else if (error.response.status === 409) {
        setResponse("User already exists");
      } else {
        setResponse("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      {success ? (
        <section className="succesful_registration">
          <div>
            <h1>Registration Successful</h1>
            <Link to="/login">Login</Link>
          </div>
        </section>
      ) : (
        <section className="registration">
          <h1>Registration</h1>
          <form className="register_form" onSubmit={handleSubmit}>
            <div>
              <h2 className="response">{response}</h2>
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button className="submit" type="submit">
                Register
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
