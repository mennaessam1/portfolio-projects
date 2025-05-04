"use client";
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

interface FormData {
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  nationality?: string;
  jobOrStudent?: string;
  DOB?: Date | null;
  IDdocument?: File | null;
  certificate?: File | null;
}

interface Option {
  id: number;
  option: string | number;
}
//needs checking
const roleOptions: Array<Option> = [
  { id: 1, option: "Tourist" },
  { id: 2, option: "Advertiser" },
  { id: 3, option: "Seller" },
  { id: 4, option: "Tour Guide" },
];

const SignUpForm = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("Tourist");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [IDdocumentName, setIDdocumentName] = useState<string | null>(null);
  const [certificateName, setCertificateName] = useState<string | null>(null);

  const [IDdocument, setIDdocument] = useState<File | null>(null);
  const [certificate, setCertificate] = useState<File | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("");
    data.DOB = startDate;
    console.log('Data:', data);
    let response;

    if (selectedRole === "Tourist") {
      response = await registerTourist(data);
    } else {
      response = await registerPendingUser(data, IDdocument, certificate, selectedRole);
    }
    
    if ("error" in response) {
      toast.error(`Error: ${response.error}`, { id: toastId });
    } else {
      toast.success("User registered successfully!", { id: toastId });
      reset();
      router.push("/sign-in");
    }
  };

  const handleRoleChange = (item: Option) => {
    setSelectedRole(item.option as string);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };


  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIDdocument(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertificate(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  return (
    <>
      <form className="sign-up-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="row gy-24 align-items-center justify-content-between">
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
                <label htmlFor="phone">
                  Phone<span>*</span>
                </label>
              </div>
              <div className="form-input">
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  {...register("mobileNumber", {
                    required: "Phone is required",
                    minLength: {
                      value: 2,
                      message: "Phone must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone cannot exceed 15 characters",
                    },
                  })}
                />
                {errors.mobileNumber && (
                  <ErrorMessage message={errors.mobileNumber.message as string} />
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
                  placeholder="Tourist"
                  className="full-width"
                  onChange={handleRoleChange}
                  name="role"
                />
              </div>
            </div>
          </div>

          {selectedRole === "Tourist" && (
            <>
              <div className="col-12">
                <div className="from-input-box">
                  <div className="form-input-title">
                    <label htmlFor="nationality">
                      Nationality<span>*</span>
                    </label>
                  </div>
                  <div className="form-input">
                    <input
                      id="nationality"
                      type="text"
                      placeholder="Nationality"
                      {...register("nationality", {
                        required: "Nationality is required",
                        minLength: {
                          value: 2,
                          message: "Nationality must be at least 2 characters",
                        },
                        maxLength: {
                          value: 15,
                          message: "Nationality cannot exceed 15 characters",
                        },
                      })}
                    />
                    {errors.nationality && (
                      <ErrorMessage message={errors.nationality.message as string} />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="from-input-box">
                  <div className="form-input-title">
                    <label htmlFor="jobOrStudent">
                      Job or Student<span>*</span>
                    </label>
                  </div>
                  <div className="form-input">
                    <input
                      id="jobOrStudent"
                      type="text"
                      placeholder="Job or Student"
                      {...register("jobOrStudent", {
                        required: "Job or Student is required",
                        minLength: {
                          value: 2,
                          message: "Job or Student must be at least 2 characters",
                        },
                        maxLength: {
                          value: 15,
                          message: "Job or Student cannot exceed 15 characters",
                        },
                      })}
                    />
                    {errors.jobOrStudent && (
                      <ErrorMessage message={errors.jobOrStudent.message as string} />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="from-input-box">
                  <div className="form-input-title">
                    <label htmlFor="DOB">
                      Date of Birth<span>*</span>
                    </label>
                  </div>
                  <div className="form-input banner-search-item">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => {
                        setStartDate(date);
                        setValue("DOB", date); // Update the form value for DOB
                      }}
                      isClearable={true}
                      placeholderText="Select Date"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      
                      className="form-control w-100"
                      wrapperClassName="w-100"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedRole !== "Tourist" && (
            <>
              <div className="col-12">
                <div className="from-input-box">
                  <div className="form-input-title">
                    <label htmlFor="IDdocument">
                      ID Document<span>*</span>
                    </label>
                  </div>
                  <div className="form-input">
                    <input
                      id="IDdocument"
                      type="file"
                      {...register("IDdocument", {
                        required: "ID Document is required",
                      })}
                      className="custom-file-input"
                      onChange={(e) => handleIdFileChange(e, setIDdocumentName)}
                    />
                    <label htmlFor="IDdocument" className="custom-file-label">
                      <FontAwesomeIcon icon={faUpload} /> Upload ID Document
                    </label>
                    {IDdocumentName && (
                      <p className="file-name">{IDdocumentName}</p>
                    )}
                    {errors.IDdocument && (
                      <ErrorMessage message={errors.IDdocument.message as string} />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="from-input-box">
                  <div className="form-input-title">
                    <label htmlFor="certificate">
                      Certificate<span>*</span>
                    </label>
                  </div>
                  <div className="form-input">
                    <input
                      id="certificate"
                      type="file"
                      {...register("certificate", {
                        required: "Certificate is required",
                      })}
                      className="custom-file-input"
                      onChange={(e) => handleCertFileChange(e, setCertificateName)}
                    />
                    <label htmlFor="certificate" className="custom-file-label">
                      <FontAwesomeIcon icon={faUpload} /> Upload Certificate
                    </label>
                    {certificateName && (
                      <p className="file-name">{certificateName}</p>
                    )}
                    {errors.certificate && (
                      <ErrorMessage message={errors.certificate.message as string} />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="sign-btn mt-20">
          <button
            type="submit"
            className="bd-primary-btn btn-style is-bg radius-60"
          >
            <span className="bd-primary-btn-text">Sign Up</span>
            <span className="bd-primary-btn-circle"></span>
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;