export const getName = (name: string) => {
  return name.toLowerCase().replaceAll(" ", "_");
};

export type defaultUsertype = {
  address: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  roles: string;
  username: string;
  id?:number
};

export const defaultUserValues:defaultUsertype = {
  address: "",
  email: "",
  firstname: "",
  lastname: "",
  phone: "",
  roles: "",
  username: "",
};
