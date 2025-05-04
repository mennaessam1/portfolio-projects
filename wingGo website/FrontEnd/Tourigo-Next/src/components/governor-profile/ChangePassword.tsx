"use client";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import axios from 'axios';
import { changeTouristPassword } from "@/api/ProfileApi";
import { changeAdvertiserPassword } from "@/api/AdvertiserProfileApi";
import { changeTourGuidePassword } from "@/api/TourGuideProfileApi";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordProps {
    id: string;
}


const ChangePassword: React.FC<ChangePasswordProps> = ( {id }) => {
  const router = useRouter();
  
    console.log('Tourist ID:', id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const toastId = toast.loading("");
    try {
        console.log('Change password:', id, data.oldPassword, data.newPassword, data.confirmNewPassword);
      const response = await changeTourGuidePassword(id, data.oldPassword, data.newPassword, data.confirmNewPassword);
      toast.success("Password changed successfully", { id: toastId, duration: 1000 });
      reset();
     router.push("/tour-guide/my-profile");
      
      
    } catch (error) {
      toast.error("Error changing password", { id: toastId });
      console.error('Error changing password:', error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box mb-15">
          <input
            type="password"
            className="input"
            placeholder="Old Password"
            {...register("oldPassword", { required: "Old password is required" })}
          />
          {errors.oldPassword && (
            <ErrorMessage message={errors.oldPassword.message as string} />
          )}
        </div>
        <div className="input-box mb-15">
          <input
            type="password"
            className="input"
            placeholder="New Password"
            {...register("newPassword", { required: "New password is required" })}
          />
          {errors.newPassword && (
            <ErrorMessage message={errors.newPassword.message as string} />
          )}
        </div>
        <div className="input-box mb-15">
          <input
            type="password"
            className="input"
            placeholder="Confirm New Password"
            {...register("confirmNewPassword", { required: "Please confirm your new password" })}
          />
          {errors.confirmNewPassword && (
            <ErrorMessage message={errors.confirmNewPassword.message as string} />
          )}
        </div>
        <div className="sign-btn mb-20">
          <button
            type="submit"
            className="bd-primary-btn btn-style is-bg radius-60"
          >
            <span className="bd-primary-btn-text">Change Password</span>
            <span className="bd-primary-btn-circle"></span>
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;