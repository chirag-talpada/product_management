import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { getName } from "../helper";

type props={
    label:string,
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors<FieldValues>
}

const TextBox = ({label,register,errors}:props) => {
  return (
    <div className="mb-4">
      <div className="text-left text-black font-normal">{label}</div>
      <div>
        <input
          type="text"
          {...register(`${getName(label)}`)}
          placeholder={label}
          className="border border-black font-normal rounded-md px-3 py-2"
        />
      </div>
      <div className="text-red-600 text-left">
      {errors[`${getName(label)}`]?.message as string}
      </div>
    </div>
  );
};

export default TextBox;
