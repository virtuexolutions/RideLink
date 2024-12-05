import * as Yup from 'yup';
// export const loginSchema = Yup.object({
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   });

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
});

export const SignupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
  contact: Yup.number()
    // .matches(/^\d+$/, 'Mobile number must contain only digits')
    // .min(10, 'Mobile number must be at least 10 digits')
    // .max(15, 'Mobile number cannot exceed 15 digits')
    .required('Mobile number is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Required'),
});

export const forgotpasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
});
