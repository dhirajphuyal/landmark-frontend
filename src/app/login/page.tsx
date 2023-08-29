"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { TextField, CircularProgress } from "@mui/material";
import axios from "axios";

import { instance } from "../../../config/axios";

interface Credentials {
  username: string;
  usernameError: string;
  password: string;
  passwordError: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
  });

  const [loading, setLoading] = useState(false);

  //kyc login api call
  const postLogin = async () => {
    try {
      setLoading(true);
      const res = await instance.post("/Login", {
        username: credentials.username,
        password: credentials.password,
      });
      if (res) {
        setLoading(false);
        setCredentials({
          ...credentials,
          usernameError: "",
          passwordError: "",
        });
        localStorage.setItem("token", res?.data);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error?.response?.data) {
          setCredentials({
            ...credentials,
            usernameError: error?.response?.data,
            passwordError: error?.response?.data,
          });
        }
      }
    }
  };

  const handleCredentialsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
      [`${name}Error`]: "",
    }));
  };

  const handleLogin = () => {
    if (!credentials.username) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        usernameError: "Please enter your username",
      }));
    } else if (!credentials.password) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        passwordError: "Please enter password",
      }));
    } else {
      postLogin();
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <span className="text-3xl font-bold">{`Let's get started`}</span>
      <div className="flex items-center justify-center mt-[40px]">
        <div className="flex flex-col gap-[20px]">
          <span className="text-[25px] font-semibold">
            Login with Email or Phone Number
          </span>
          <div className="flex flex-col gap-[15px]">
            <TextField
              size="small"
              sx={{ width: "25em" }}
              error={credentials.usernameError.length > 0 ? true : false}
              helperText={credentials.usernameError}
              onChange={handleCredentialsChange}
              value={credentials.username}
              name="username"
              placeholder="Enter your email or phone number"
              onKeyDown={handleEnter}
              InputProps={{
                sx: {
                  borderRadius: "34px",
                  padding: "4px 8px",
                  fontSize: "18px",
                  backgroundColor: "#F2FFFB",
                  border: "none",
                },
                disableUnderline: true,
              }}
            />
            <TextField
              size="small"
              sx={{ width: "25em" }}
              error={credentials.passwordError.length > 0 ? true : false}
              helperText={credentials.passwordError}
              onChange={handleCredentialsChange}
              value={credentials.password}
              name="password"
              type="password"
              placeholder="Password"
              onKeyDown={handleEnter}
              InputProps={{
                sx: {
                  borderRadius: "34px",
                  padding: "4px 8px",
                  fontSize: "18px",
                  backgroundColor: "#F2FFFB",
                  border: "none",
                },
                disableUnderline: true,
              }}
            />
            <div className="flex justify-end">
              <a
                href="https://kyc.naasasecurities.com.np/Account/ResetPassword"
                target="_blank"
              >
                Forgot your password?
              </a>
            </div>
            <button
              onClick={handleLogin}
              className="rounded-[26px] py-[10px] px-[20px] bg-naasa-yellow"
            >
              {loading ? <CircularProgress size={25} /> : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
