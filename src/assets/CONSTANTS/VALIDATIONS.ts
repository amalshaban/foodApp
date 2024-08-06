export const EMAILVALIDATION =  {
        required: "Email is required",
        pattern:{
          value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
          message:'Email address is not valid !'
        }
       };
