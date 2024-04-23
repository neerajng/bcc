import { useState } from "react";
import { useFormik } from "formik";
import { submitSchema } from '../utils/validationSchemas';
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from 'react-icons/md';

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

const ContactForm = () => { 

    const [otp, setOtp] = useState("");
    const initialValues = {
        dropdown: "",
        firstName: "",
        lastName: "",
        email: "",
        otp: "",
        phone: "",
        message: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setErrors } = useFormik({
        initialValues: initialValues,
        validationSchema: submitSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const formValues = { ...values, genOtp: otp };
                console.log(formValues);
                const response = await fetch(`${apiUrl}/submitForm`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                } else {
                    const errorData = await response.json();
                    console.log('Failed to submit form:', errorData.message);
                    setErrors({ otp: errorData.message });
                }
            } catch (error) {
                console.log('Error submitting form:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });
    
    
    const handleGetOTP = async (e) => {
        e.preventDefault();
        
        if (!values.email) {
            // If email is not provided, show error message
            console.log(values.email+"not available")
            return;
        }

        try {
            // Make API call to send OTP email
            const response = await fetch(`${apiUrl}/sendEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email }),
            });

            if (response.ok) {
                // OTP email sent successfully
                const data = await response.json();
                console.log(data.message, data.otp);
                setOtp(data.otp)                
            } else {
                // Handle error response from the API
                const errorData = await response.json();
                console.log('Failed to send OTP email:', errorData.message);
            }
        } catch (error) {
            console.log('Error sending OTP email:', error);
        }
    };   

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg flex flex-col 
        shadow-lg">

            <div className="border-b border-gray-900/10 pb-12 ">
                <h2 className="text-base leading-7  text-indigo-600 font-bold">Send us a Message</h2>

                <select
                className="select border-gray-900/10 w-full 
                max-w-xs mt-4 bg-white overflow-hidden "
                name="dropdown" value={values.dropdown} onChange={handleChange} onBlur={handleBlur}
    
                >
                    <option disabled selected value="" hidden>
                        Organization/Job seeker</option>
                    <option value="Organization" className="max-w-xs overflow-hidden">Organization</option>
                    <option value="Job Seeker" className="max-w-xs overflow-hidden">Job Seeker</option>
                </select>
                <AnimatePresence>
                    {errors.dropdown && touched.dropdown && (
                        <motion.div
                            className="flex items-center gap-1 px-4 mt-1 font-semibold max-w-xs
                            text-xs text-red-600 bg-red-50 rounded"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            role="alert"
                        >
                            <MdError />
                            <span>{errors.dropdown}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">
                    <div className="sm:col-span-3">
                        <input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="First name*"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder-py-1.5 px-3
                            sm:text-sm sm:leading-6 bg-white"
                            onBlur={handleBlur}
                        />
                        <AnimatePresence>
                            {errors.firstName && touched.firstName && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 mt-1 font-semibold text-xs 
                                    text-red-600 bg-red-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdError />
                                    <span>{errors.firstName}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                    <div className="sm:col-span-3">
                        <input
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Last name*"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder-py-1.5 px-3
                            sm:text-sm sm:leading-6 bg-white"
                            onBlur={handleBlur}
                        />
                        <AnimatePresence>
                            {errors.lastName && touched.lastName && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 mt-1 font-semibold text-xs 
                                    text-red-600 bg-red-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdError />
                                    <span>{errors.lastName}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="sm:col-span-4 xxs:mb-10 sm:mb-0">
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Email address*"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder-py-1.5 px-3
                            sm:text-sm sm:leading-6 bg-white"
                            onBlur={handleBlur}
                        />
                        <AnimatePresence>
                            {errors.email && touched.email && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 mt-1 font-semibold text-xs 
                                    text-red-600 bg-red-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdError />
                                    <span>{errors.email}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="sm:col-span-2 relative ">
                        <button                         
                            className={`text-white absolute inset-x-0 bottom-0 py-1.5 rounded-full text-sm 
                            ${values.email && !errors.email ? 'bg-indigo-600' : 'bg-indigo-400'}`}
                            onClick={handleGetOTP}
                            disabled={!values.email || errors.email}
                            >
                            {values.email && !errors.email ? 'Get OTP' : 'Verify Email'}
                        </button>                        
                    </div>

                    <div className="sm:col-span-6">
                        <input
                            type="text"
                            name="otp"
                            value={values.otp}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="OTP*"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder-py-1.5 px-3
                            sm:text-sm sm:leading-6 bg-white"
                            onBlur={handleBlur}
                        />
                        <AnimatePresence>
                            {errors.otp && touched.otp && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 mt-1 font-semibold text-xs 
                                    text-red-600 bg-red-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdError />
                                    <span>{errors.otp}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    
                    <div className="sm:col-span-6">
                        <input
                            type="text"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Phone number*"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder-py-1.5 px-3
                            sm:text-sm sm:leading-6 bg-white"
                            onBlur={handleBlur}
                        />
                        <AnimatePresence>
                            {errors.phone && touched.phone && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 mt-1 font-semibold text-xs 
                                    text-red-600 bg-red-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdError />
                                    <span>{errors.phone}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="col-span-full">
                        <textarea
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Leave us a message.."
                            className="block w-full resize rounded-md border-0 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                            focus:ring-indigo-600 placeholder-py-1.5 px-3
                            sm:text-sm sm:leading-6 bg-white"
                            onBlur={handleBlur}
                        />
                        <AnimatePresence>
                            {errors.message && touched.message && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 mt-1 font-semibold text-xs 
                                    text-red-600 bg-red-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdError />
                                    <span>{errors.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="sm:col-span-4 ">
                        <button className="text-white inset-x-0 bottom-0
                         bg-indigo-600 border-indigo-600 border-4 rounded-full px-10 py-2">
                            Submit</button>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default ContactForm;