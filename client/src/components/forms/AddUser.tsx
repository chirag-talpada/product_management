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
import { UserInfoType } from "../../types/user.type";
import { toast } from "react-toastify";

type rolesTyepe = {
  name: string;
};

type props = {
  closeModel: () => void;
};

const AddUser = ({ closeModel }: props) => {
  const rolesData = useFetch(`${process.env.REACT_APP_BASE_URL}/roles`);
  const [roles, setRoles] = useState<Option[]>();
  const [loading,setLoading]=useState<boolean>(false)

  useEffect(() => {
    if (rolesData) {
      let data: rolesTyepe[] = rolesData?.data as rolesTyepe[];
      let optionData: Option[] = data?.map((role) => {
        return { value: role.name, label: role.name };
      });
      setRoles(optionData);
    }
  }, [rolesData]);

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
      let { data } = await axios.post<UserInfoType>(
        `${process.env.REACT_APP_BASE_URL}/users`,
        userData
      );

      setLoading(false);
      if (data.success) {
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

  return (
    <form onSubmit={handleSubmit(onUserSubmit)}>
      <div className="grid grid-cols-2 gap-x-7">
        <TextBox label="Username" register={register} errors={errors} />

        <TextBox label="First name" register={register} errors={errors} />

        <TextBox label="Last name" register={register} errors={errors} />

        <TextBox label="Phone number" register={register} errors={errors} />

        <TextBox label="Email" register={register} errors={errors} />

        <div className="mb-4 text-left">
          <div className="text-left text-black font-normal">Roles</div>

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
            placeholder="address"
            {...register("address")}
            className="border resize-none border-black font-normal rounded-md px-3 py-2 w-full"
          ></textarea>
        </div>
        <div className="text-red-600 text-left">
          {errors.address?.message as string}
        </div>
      </div>

      <div>
        <input
          type="submit"
          value="Add"
          className={`bg-black text-white px-4 py-2 w-full rounded-md cursor-pointer ${loading?'opacity-30 pointer-events-none cursor-not-allowed':''}`}
        />
      </div>
    </form>
  );
};

export default AddUser;
