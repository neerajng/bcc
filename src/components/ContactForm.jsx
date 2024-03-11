const ContactForm = () => {
    return (
        <div className="bg-white p-8 rounded-lg flex flex-col">

            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base leading-7  text-purple-600 font-bold">Send us a Message</h2>

                <select className="select border-gray-900/10 w-full max-w-xs mt-4 overflow-hidden">
                    <option disabled selected className="">
                        Organization/Job seeker</option>
                    <option className="max-w-xs overflow-hidden">Organization</option>
                    <option className="max-w-xs overflow-hidden">Job seeker</option>
                </select> 

                <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address*
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3 xxs:mb-10 sm:mb-0">
                        <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                            OTP
                        </label>
                        <div className="mt-2">
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                autoComplete="otp"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3 relative ">
                        <button className="text-white absolute inset-x-0 bottom-0
                         bg-purple-700 border-purple-700 border-0 rounded-full">
                            Get OTP</button>
                    </div>
                    
                    <div className="col-span-full">
                        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                        Leave us a message..
                        </label>
                        <div className="mt-2">
                            <textarea                                 
                                name="message"
                                id="message" 
                                autoComplete="off"                               
                                className="block w-full resize rounded-md border-0 py-1.5 
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4 ">
                        <button className="text-white inset-x-0 bottom-0
                         bg-purple-700 border-purple-700 border-4 rounded-full">
                            Submit</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactForm;