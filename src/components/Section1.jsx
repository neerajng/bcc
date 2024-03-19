const Section1 = () => {
    return (
    <div id="business" className="hero text-zinc-950  scroll-my-24">{/* border-4 border-indigo-600 */}
        <div className="hero-content flex-col lg:flex-row bg-white-500 py-16 px-10">
            <div className="bg-white-500">
                <h1 className="text-4xl xs:text-5xl leading-tight font-bold">Are you a customer exploring business solutions?</h1>

                <p className="text-xl py-3">For customers seeking cost-effective software solutions, 
                we offer a comprehensive range of customizable products and services designed to meet your unique needs. 
                Our team of dedicated professionals works tirelessly to deliver top-notch solutions without breaking the bank.</p>  

                <p className="text-xl py-3">Experience the difference with our platform and embark on a journey of growth, innovation, 
                and success. <a href="#contactus" 
                className="text-indigo-600 font-bold no-underline hover:underline">Contact us now.</a></p>          

            </div>
        </div>
    </div>
    );
};

export default Section1;
