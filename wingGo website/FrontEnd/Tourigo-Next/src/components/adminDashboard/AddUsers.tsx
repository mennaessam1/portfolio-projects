import ErrorMessage from "@/elements/error-message/ErrorMessage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { registerPendingUser, registerTourist, registerUser } from "@/api/registerApi";
import NiceSelect from "@/elements/NiceSelect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import { addAdmin, addGovernor } from "@/api/adminApi";

interface FormData {
    username: string;
    email: string;
    password: string;
    role: string;
    
  }
  
  interface Option {
    id: number;
    option: string | number;
  }
  //needs checking
  const roleOptions: Array<Option> = [
    { id: 1, option: "Admin" },
    { id: 2, option: "TourismGovernor" },
  ];

const AddUsers = () => {

    const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("Admin");
  
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("");
    ;
    console.log('Data:', data);
    let response;

    if (selectedRole === "Admin") {
      response = await addAdmin(data.username, data.email, data.password);
    } else if(selectedRole === "TourismGovernor") {
      response = await addGovernor(data.username, data.email, data.password);
    }
    
    if ("error" in response) {
      toast.error(`Error: ${response.error}`, { id: toastId });
    } else {
      toast.success("User registered successfully!", { id: toastId });
      reset();
    }
  };

  const handleRoleChange = (item: Option) => {
    setSelectedRole(item.option as string);
  };




  return (
    <>
     <section className="bd-team-details-area section-space position-relative">
        <div className="container">
        
      <form className="sign-up-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="row gy-24 align-items-center justify-content-between">
        <div className="col-12">
            <div className="from-input-box">
              <div className="form-input-title">
                <label htmlFor="role">
                  Role<span>*</span>
                </label>
              </div>
              <div className="form-input">
                <NiceSelect
                  options={roleOptions}
                  defaultCurrent={0}
                  placeholder="Admin"
                  className="full-width"
                  onChange={handleRoleChange}
                  name="role"
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="from-input-box">
              <div className="form-input-title">
                <label htmlFor="userName">
                  User Name<span>*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  id="username"
                  type="text"
                  placeholder="User Name"
                  {...register("username", {
                    required: "User Name is required",
                    minLength: {
                      value: 2,
                      message: "User Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "User Name cannot exceed 15 characters",
                    },
                  })}
                />
                {errors.username && (
                  <ErrorMessage message={errors.username.message as string} />
                )}
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="from-input-box">
              <div className="form-input-title">
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage message={errors.email.message as string} />
                )}
              </div>
            </div>
          </div>

          

          <div className="col-12">
            <div className="from-input-box">
              <div className="form-input-title">
                <label htmlFor="password">
                  Password<span>*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 2,
                      message: "Password must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Password cannot exceed 15 characters",
                    },
                  })}
                />
                {errors.password && (
                  <ErrorMessage message={errors.password.message as string} />
                )}
              </div>
            </div>
          </div>

          

        </div>
        <div className="sign-btn mt-20">
          <button
            type="submit"
            className="bd-primary-btn  btn-style radius-60 mb-10"
          >
            <span className="bd-primary-btn-text">add user</span>
            <span className="bd-primary-btn-circle"></span>
          </button>
        </div>
      </form>
    
        </div>
        </section>
              
    </>
  );
}

export default AddUsers;
