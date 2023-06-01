import React, { useState } from "react";

import Model from "../../../components/Model";
import AddUser from "../../../components/forms/AddUser";
import useFetch from "../../../hooks/useFetch";

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

  const usersData = useFetch(`${process.env.REACT_APP_BASE_URL}/users`);
  
  

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
          <AddUser closeModel={closeModel} />
        </Model>
      )}
      <div>
        <button
          onClick={openModel}
          className="bg-black text-white py-2 px-3 text-sm rounded-md"
        >
          Add User
        </button>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-lg rounded">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      id
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Username
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Firstname
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Lastname
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      address
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      phone
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      role
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                    <td className="whitespace-nowrap  px-6 py-4">Mark</td>
                    <td className="whitespace-nowrap  px-6 py-4">Otto</td>
                    <td className="whitespace-nowrap  px-6 py-4">@mdo</td>
                  </tr>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">2</td>
                    <td className="whitespace-nowrap  px-6 py-4 ">Jacob</td>
                    <td className="whitespace-nowrap  px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap  px-6 py-4">@fat</td>
                  </tr>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">3</td>
                    <td colSpan={2} className="whitespace-nowrap  px-6 py-4">
                      Larry the Bird
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
