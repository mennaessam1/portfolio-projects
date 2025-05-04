"use client";
import { login } from "@/api/LoginApi";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
interface FormData {
  username: string;
  password: string;
}

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login(data.username, data.password);
      toast.success("Login successful!", { id: toastId, duration: 1000 });
      reset();
      router.push("/home-two");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.", { id: toastId });
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box mb-15">
          <input
            type="text"
            className="input"
            id="username"
            placeholder="Type Username Here"
            {...register("username", {
              required: "Email is required",
            })}
          />
          {errors.username && (
            <ErrorMessage message={errors.username.message as string} />
          )}
        </div>
        <div className="input-box mb-20">
          <input
            type="password"
            className="input"
            id="password"
            placeholder="Type Password Here"
            {...register("password", {
              required: "Password is required",
              
            })}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message as string} />
          )}
        </div>
        <div className="sign-meta d-flex justify-content-between mb-20">
          {/* <div className="sign-remember">
            <label className="footer-form-check-label signing-page cursor">
              <input type="checkbox" />
              <svg viewBox="0 0 64 64" height="2em" width="2em">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  className="path"
                ></path>
              </svg>{" "}
              Remember me
            </label>
          </div> */}
          <div className="sign-forgot">
            <Link href="/forgot" className="sign-link">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="sign-btn">
          <button
            type="submit"
            className="bd-primary-btn btn-style radius-60"
          >
            <span className="bd-primary-btn-text">Log in</span>
            <span className="bd-primary-btn-circle"></span>
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
