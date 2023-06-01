export type UserInfoType = {
  address: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  roles: { value: string; label: string };
  username: string;
  [key: string]: any;
};
