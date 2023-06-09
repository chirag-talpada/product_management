import { useCallback, useEffect, useState } from "react";

import Model from "../../../components/Model";
import UserForm from "../../../components/forms/UserForm";
import { UserInfoType } from "../../../types/user.type";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/userSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { defaultUserValues, defaultUsertype } from "../../../helper";
import axios from "axios";
import { toast } from "react-toastify";

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

type initialStateType = {
  isOpen: boolean;
  defaultValue: defaultUsertype;
  isEdit: boolean;
};

const initialState: initialStateType = {
  isOpen: false,
  defaultValue: defaultUserValues,
  isEdit: false,
};

const Users = () => {
  const [modelData, setModelData] = useState<initialStateType>(initialState);
  const { users: usersData } = useSelector((state: RootState) => {
    return state;
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const closeModel = useCallback(() => {
    setModelData((prev) => {
      return { ...prev, isOpen: false };
    });
  }, []);

  const openModel = useCallback(() => {
    setModelData((prev) => {
      return { ...prev, isOpen: true,isEdit:false,defaultValue:defaultUserValues };
    });
  }, []);

  const editUser = async (id: number) => {
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`
      );

      setModelData((prev) => {
        return { ...prev, isOpen: true, isEdit: true ,defaultValue:{
          address:data.address,
          email:data.email,
          firstname:data.firstname,
          lastname:data.lastname,
          phone:data.phone,
          roles:data['role.name'],
          username:data.username,
          id
        }};
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser=async (id:number)=>{

    if(!window.confirm('Are you sure, you want to delete this record?'))
    {
      return
    }

    try {
      let { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`
      );

      if(data?.success){
        toast.success(data.message);
        dispatch(getUsers());
      }
      
      
    } catch (err) {
      if(axios.isAxiosError(err)){
        toast.error(err?.response?.data.error);
      }
    }
  }

  return (
    <div className="m-3 text-right">
      {modelData.isOpen && (
        <Model closeModel={closeModel}>
          <UserForm
            defaultFormValue={modelData.defaultValue}
            isEdit={modelData.isEdit}
            closeModel={closeModel}
          />
        </Model>
      )}
      <div>
        <button
          onClick={openModel}
          className="bg-black text-white py-3 px-3 text-sm rounded-md"
        >
          Add User
        </button>
      </div>

      {usersData.data.length !== 0 && (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-3 sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-[1px_4px_14px_6px_rgba(0,0,0,0.36)] rounded">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th scope="col" className=" px-6 py-3">
                        id
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        Firstname
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        Lastname
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        address
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        phone
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        role
                      </th>
                      <th scope="col" className=" px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.data.map((user, index) => {
                      user = user as UserInfoType;

                      return (
                        <tr
                          className="border-b dark:border-neutral-500"
                          key={index}
                        >
                          <td className="whitespace-nowrap  px-6 py-3 font-medium">
                            {user.id}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user.username}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user.firstname === null ? "-" : user.firstname}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user.lastname === null ? "-" : user.lastname}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user.address === null ? "-" : user.address}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user.phone === null ? "-" : user.phone}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            {user["role.name"]}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-3">
                            <button
                              className="bg-green-500 px-3 py-1 rounded-md font-bold text-green-950"
                              onClick={() => {
                                editUser(Number(user.id));
                              }}
                            >
                              edit
                            </button>
                            <button
                              className="bg-red-400 ml-2 px-3 py-1 rounded-md font-bold text-red-950"
                              onClick={()=>{
                                deleteUser(Number(user.id));
                              }}
                             >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {!usersData.loading && usersData?.data?.length === 0 && (
        <div className="border-dashed border-blue-300 border-2 rounded mt-6 flex justify-center py-7">
          <img
            className="shadow-lg shadow-black rounded-full"
            src="/assets/lf20_mxuufmel.gif"
            alt="no data found"
          />
        </div>
      )}
    </div>
  );
};

export default Users;
