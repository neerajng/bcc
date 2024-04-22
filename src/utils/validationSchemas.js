import * as Yup from "yup";

export const submitSchema = Yup.object({
    dropdown: Yup.string().required("Please select an option"),
    firstName: Yup.string().min(2).max(25).required("Please enter your first name"),
    lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
    email: Yup.string().
        email("Please enter a valid email")
        .matches(
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        )
        .required("Please enter your email"),
    otp: Yup.string()
        .min(6, "Please enter a valid OTP")
        .max(6, "Please enter a valid OTP")
        .required("Please enter OTP"),
    phone: Yup.string()
        .min(10, "Please enter a valid Phone number")
        .max(10, "Please enter a valid Phone number")
        .required("Please enter your phone number"),
    message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .max(200, "Message must not exceed 200 characters") 
        .required("Please enter a message")
});