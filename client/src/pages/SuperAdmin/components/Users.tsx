import React, { useState } from "react";


import Model from "../../../components/Model";
import AddUser from "../../../components/forms/AddUser";

export type Option = {
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
  
  // const usersData = useFetch(`${process.env.REACT_APP_BASE_URL}/users`);

  const closeModel = () => {
    setIsOpen(false);
  };

  const openModel = () => {
    setIsOpen(true);
  };

  return (
    <div className="m-3 text-right">
      {isOpen && (
        <Model closeModel={closeModel}>
          <AddUser />
        </Model>
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
