export type UserInfoType = {
  address: string | null;
  email: string;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  ['role.name']: string;
  username: string;
  [key: string]: any;
};

