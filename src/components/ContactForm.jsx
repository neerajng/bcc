import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { submitSchema } from '../utils/validationSchemas';
import { AnimatePresence, motion } from "framer-motion";
import { MdError, MdErrorOutline } from 'react-icons/md';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

const ContactForm = () => {

    const [otp, setOtp] = useState("");
    const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
    const [countdownValue, setCountdownValue] = useState(60);
    const [otpMessageVisible, setOtpMessageVisible] = useState(false);
    useEffect(() => {
        if (otpButtonDisabled) {
            const timer = setTimeout(() => {
                setCountdownValue(prevValue => prevValue - 1);
            }, 1000);

            // Clear timeout when component unmounts or countdown reaches 0
            if (countdownValue === 0) {
                setOtpButtonDisabled(false);
                setCountdownValue(60);
            }

            return () => clearTimeout(timer);
        }
    }, [otpButtonDisabled, countdownValue]);

    const initialValues = {
        dropdown: "",
        firstName: "",
        lastName: "",
        email: "",
        otp: "",
        phone: "",
        message: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit,
        setErrors, resetForm, isSubmitting } = useFormik({
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
                        setOtpMessageVisible(false);
                        // Trigger a success toast
                        toast.success('✅ Thank you! We have received your message and will contact you shortly.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                            onClose: () => window.location.reload(),
                        });
                        resetForm();
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
            console.log(values.email + "not available")
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
                console.log(errors);
                console.log(data.message, data.otp);
                setOtp(data.otp)
                setOtpButtonDisabled(true);
                setOtpMessageVisible(true);
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
                <h2 className="text-base leading-7  text-zinc-950 font-bold">Send us a Message</h2>

                <select
                    className="select border-gray-900/10 w-full 
                max-w-xs mt-4 bg-white overflow-hidden "
                    name="dropdown" value={values.dropdown} onChange={handleChange} onBlur={handleBlur}

                >
                    <option disabled selected value="" hidden>
                        Organization/Job Seeker</option>
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

                    <div className="sm:col-span-4 xxs:mb-10 sm:mb-0 lg:col-span-3">
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

                    <div className="sm:col-span-2 relative">
                        <button
                            className={`text-white absolute inset-x-0 bottom-0 py-1.5 rounded-full text-sm 
                            ${otpButtonDisabled ? 'bg-indigo-300' : ''}
                            ${values.email && !errors.email ? 'bg-indigo-600' : 'bg-indigo-300'}`}
                            style={{ width: '120px', height: '40px' }}
                            onClick={handleGetOTP}
                            disabled={!values.email || errors.email || otpButtonDisabled}
                        >
                            {values.email && !errors.email ? 'Get OTP' : 'Verify Email'}

                        </button>
                    </div>

                    <div className="sm:col-span-6">
                        <AnimatePresence>
                            {otpMessageVisible && otpButtonDisabled && (
                                <motion.div
                                    className="flex items-center gap-1 px-4 my-1 font-semibold text-xs 
                                    text-green-600 bg-green-50 rounded"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    role="alert"
                                >
                                    <MdErrorOutline />
                                    <span>Check mail and enter OTP. Next OTP available in {countdownValue} seconds</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                        <button className={`text-white inset-x-0 bottom-0 px-10 py-2 rounded-full 
                        ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600'}`}
                            disabled={isSubmitting} style={{ width: '160px', height: '40px' }}
                        >
                            {isSubmitting ? <span className="loading"></span> : <span>Submit</span>}
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default ContactForm;