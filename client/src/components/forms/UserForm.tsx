import React, { useEffect, useState } from "react";
import TextBox from "../TextBox";
import Select, { SingleValue } from "react-select";
import { Option } from "../../pages/SuperAdmin/components/Users";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userShema } from "../../pages/SuperAdmin/validationSchema";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { AppDispatch } from "../../redux/store";

import { UserInfoType } from "../../types/user.type";
import { defaultUsertype } from "../../helper";

export type rolesType = {
  name: string;
};

type props = {
  closeModel: () => void;
  defaultFormValue: defaultUsertype;
  isEdit: boolean;
};

const UserForm = ({ closeModel, defaultFormValue, isEdit }: props) => {
  const rolesData = useFetch(`${process.env.REACT_APP_BASE_URL}/roles`);
  const [roles, setRoles] = useState<Option[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const {
    setValue,
    setError,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userShema),
  });

  useEffect(() => {
    if (rolesData) {
      let data: rolesType[] = rolesData?.data as rolesType[];
      let optionData: Option[] = data?.map((role) => {
        return { value: role.name, label: role.name };
      });
      setRoles(optionData);
    }
  }, [rolesData]);

  useEffect(() => {
    if (defaultFormValue.roles) {
      setValue(
        "roles",
        { label: defaultFormValue.roles, value: defaultFormValue.roles },
        { shouldValidate: true }
      );
    }
  }, [defaultFormValue, setValue]);

  const onUserSubmit: SubmitHandler<FieldValues> = async (data) => {
    let userData: FieldValues = { ...data };

    //fix the object to send in backend
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "object") {
        userData[key] = data[key].value;
      } else {
        if (data[key]?.trim() === "") {
          userData[key] = null;
        }
      }
    });

    try {
      setLoading(true);
      let { data: response } = await axios.post<UserInfoType>(
        `${process.env.REACT_APP_BASE_URL}/users`,
        userData
      );

      setLoading(false);
      if (response.success) {  
        dispatch(getUsers());
        toast.success("User Added Succesfully!");
        closeModel();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.error) {
          console.log(err);

          toast.error(err.response?.data.error.errors[0].message);
        } else {
          setError(err.response?.data.field, {
            type: "custom",
            message: err.response?.data.message,
          });
        }
      } else {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const onUserUpdate: SubmitHandler<FieldValues> = async (data) => {
    let userData: FieldValues = { ...data };

    //fix the object to send in backend
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "object") {
        userData[key] = data[key].value;
      } else {
        if (data[key]?.trim() === "") {
          userData[key] = null;
        }
      }
    });

    try {
      setLoading(true);
      let { data: response } = await axios.put<UserInfoType>(
        `${process.env.REACT_APP_BASE_URL}/users/${defaultFormValue.id}`,
        userData
      );

      setLoading(false);
      if (response.success) {
       
        dispatch(getUsers());
        toast.success("User updated Succesfully!");
        closeModel();
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data.error) {
          toast.error(err.response?.data.error.errors[0].message);
        } else {
          setError(err.response?.data.field, {
            type: "custom",
            message: err.response?.data.message,
          });
        }
      } else {
        console.log(err);
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={
        isEdit ? handleSubmit(onUserUpdate) : handleSubmit(onUserSubmit)
      }
    >
      <div className="grid grid-cols-2 gap-x-7">
        <TextBox
          label="Username"
          register={register}
          required={true}
          errors={errors}
          defaultVal={defaultFormValue.username}
        />

        <TextBox
          label="First name"
          register={register}
          required={false}
          errors={errors}
          defaultVal={defaultFormValue.firstname}
        />

        <TextBox
          label="Last name"
          register={register}
          required={false}
          errors={errors}
          defaultVal={defaultFormValue.lastname}
        />

        <TextBox
          label="Phone number"
          register={register}
          required={false}
          errors={errors}
          defaultVal={defaultFormValue.phone}
        />

        <TextBox
          label="Email"
          register={register}
          required={true}
          errors={errors}
          defaultVal={defaultFormValue.email}
        />

        <div className="mb-4 text-left">
          <div className="text-left text-black font-normal">
            Roles
            <span className="text-red-600 text-left">*</span>
          </div>

          <Controller
            name={"roles"}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  onChange={(val: SingleValue<Option>) => {
                    setValue("roles", val, { shouldValidate: true });
                  }}
                  options={roles}
                  placeholder={"Select role..."}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid black",
                    }),
                    dropdownIndicator: (base, state) => ({
                      ...base,
                      color: "black",
                    }),
                  }}
                />
              );
            }}
          />

          <div className="text-red-600 text-left">
            {errors.roles?.message as string}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-left text-black font-normal">Address</div>
        <div>
          <textarea
            defaultValue={defaultFormValue.address}
            placeholder="address"
            {...register("address")}
            className="border resize-none border-black font-normal rounded-md px-3 py-2 w-full"
          ></textarea>
        </div>
        <div className="text-red-600 text-left">
          {errors.address?.message as string}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="submit"
          value={isEdit ? "Update" : "Save"}
          className={`bg-green-500 text-green-950 px-4 py-2 w-full rounded-md cursor-pointer font-extrabold ${
            loading ? "opacity-30 pointer-events-none cursor-not-allowed" : ""
          }`}
        />
        <button
        onClick={closeModel}
          className={`bg-gray-400 text-black px-4 py-2 w-full rounded-md cursor-pointer font-extrabold ${
            loading ? "opacity-30 pointer-events-none cursor-not-allowed" : ""
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
