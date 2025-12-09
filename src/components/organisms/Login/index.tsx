"use client";
import { Controller, useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import Navbar from "../../molecules/Navbar";
import style from "./index.module.scss";
import { PostApi } from "@/src/api";
import { apiEndpoints } from "@/src/apiEndpoints";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { REDIRECT_PATH, SESSION_KEY } from "@/src/enums";

const Login = () => {
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem(SESSION_KEY.USER);
    const token = sessionStorage.getItem(SESSION_KEY.TOKEN);
    if (user && token) {
      router.push(REDIRECT_PATH.HOME);
    }
  }, []);

  const checkLogin = async (data: any) => {
    const user = await PostApi(apiEndpoints.LOGIN_USER, data);

    if (user.userInfo != null && user.userInfo.jwtToken != null) {
      sessionStorage.setItem(SESSION_KEY.USER, user.userInfo.fullName);
      sessionStorage.setItem(SESSION_KEY.ROLE, user.userInfo.role);
      sessionStorage.setItem(SESSION_KEY.TOKEN, user.userInfo.jwtToken);

      router.push(REDIRECT_PATH.HOME);
    } else {
      alert(user.message);
    }
  };

  return (
    <div className={style.loginContainer}>
      <Navbar />
      <div className={style.loginForm}>
        <form onSubmit={handleSubmit(checkLogin)}>
          <h3>Login</h3>
          <div className={style.inputGroup}>
            <label>Username</label>
            <Controller
              name="username"
              control={control}
              render={({ field: { value, onChange } }) => (
                <input
                  type="text"
                  placeholder="Enter the username"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className={style.inputGroup}>
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <input
                  type="password"
                  placeholder="Enter the password"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <Button type={"submit"} disabled={formState.isSubmitting}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
