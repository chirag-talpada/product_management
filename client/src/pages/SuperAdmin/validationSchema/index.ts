import * as yup from "yup";

export const userShema = yup.object().shape({
  username: yup.string().required("Username is required"),
  // first_name: yup.string().required("First name is required"),
  // last_name: yup.string().required("Last name is required"),
  phone_number: yup
    .string()
    // .required("Phone number is required")
    .test("length", "Phone number must be valid", (phone) => {
        
       if((isNaN(Number(phone)) || phone?.length!==10) && phone){
            return false
        }
        
        return true
    }),
  email:yup.string().required("Email is required")
    .test('email',"Not a valid email",(email)=>{
        if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            return false
        }
        return true
    }),
  roles:yup.object().test('select',"roles must be required",(val)=>{
    
    if(val && 'value' in val && val.value){
        return true
    }
    return false
  }),
  // address:yup.string().required('Address is required')
});
