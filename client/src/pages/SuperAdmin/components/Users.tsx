import React, { useState } from "react";
import Select, { GroupBase , OptionsOrGroups, SingleValue } from "react-select";

import useFetch from "../../../hooks/useFetch";

type Option = {
  __isNew__?: any;
  label: string;
  value: string | number;
  selected?: boolean;
  checked?: any;
  onChange?: any;
  color?: string;
  extraLabel?: string;
  [key: string]: any;
};

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setSelectValue] = useState<Option | null>(null);

  const usersData = useFetch(`${process.env.REACT_APP_BASE_URL}/users`);
  const rolesData = useFetch(`${process.env.REACT_APP_BASE_URL}/roles`);

  console.log(rolesData);
  

  const options:OptionsOrGroups<Option, GroupBase<Option>> | undefined = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const closeModel = () => {
    setIsOpen(false);
    setSelectValue(null);
  };

  const openModel = () => {
    setIsOpen(true);
  };

  return (
    <div className="m-3 text-right">
      {isOpen && (
        <div className="absolute top-0 overflow-y-auto py-10 left-0 flex justify-center items-center w-full h-full bg-[#000000b5]">
          <div
            className="bg-white p-10 rounded-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={closeModel}
              className="absolute top-3 right-4 cursor-pointer text-lg font-extrabold"
            >
              X
            </span>
            <div className="mb-4">
              <div className="text-left text-black font-normal">Username</div>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="border border-black font-normal rounded-md px-3 py-2"
                />
              </div>
              <div className="text-red-600 text-left"></div>
            </div>

            <div className="mb-4">
              <div className="text-left text-black font-normal">First Name</div>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-black font-normal rounded-md px-3 py-2"
                />
              </div>
              <div className="text-red-600 text-left"></div>
            </div>

            <div className="mb-4">
              <div className="text-left text-black font-normal">Last Name</div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-black font-normal rounded-md px-3 py-2"
                />
              </div>
              <div className="text-red-600 text-left"></div>
            </div>

            <div className="mb-4">
              <div className="text-left text-black font-normal">
                Phone Number
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border border-black font-normal rounded-md px-3 py-2"
                />
              </div>
              <div className="text-red-600 text-left"></div>
            </div>

            <div className="mb-4">
              <div className="text-left text-black font-normal">Address</div>
              <div>
                <textarea
                  placeholder="address"
                  className="border resize-none border-black font-normal rounded-md px-3 py-2 w-full"
                ></textarea>
              </div>
              <div className="text-red-600 text-left"></div>
            </div>

            <div className="mb-4 text-left">
              <Select
                defaultValue={null}
                onChange={(val:SingleValue<Option>)=>{
                    setSelectValue(val);
                }}
                options={options}
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
            </div>

            <div>
              <input
                type="submit"
                value="Add"
                className="bg-black text-white px-4 py-2 w-full rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={openModel}
        className="bg-black text-white py-2 px-3 text-sm rounded-md"
      >
        Add User
      </button>
    </div>
  );
};

export default Users;
