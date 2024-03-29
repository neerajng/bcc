import bcc_dev from '../assets/images/bcc_dev.svg/'
const Section2 = () => {
    return (
    <div id="findjobs" className="hero  text-zinc-950 scroll-my-24">{/* border-4 border-indigo-600 */}
        <div className="hero-content flex-col lg:flex-row bg-white-500 py-14 px-10 ">
            <div className="">
                <h1 className="text-4xl xs:text-5xl leading-tight font-bold ">
                    Are you eager to kickstart your journey in software development?</h1>
                <p className="text-2xl py-3">Our platform caters specifically to freshers like you, providing tailored resources, guidance, and job 
                opportunities in the dynamic world of software development.</p>

                <p className="text-xl py-3">Unlock your potential and explore endless possibilities in the realm of software development with us. 
                Join our vibrant community of learners, developers, and clients to exchange ideas, collaborate on projects, and propel your career.</p>  

                <p className="text-xl py-3">Together, let&apos;s build a brighter future powered by technology and driven by passion. Join us today and let&apos;s 
                shape tomorrow, one line of code at a time!<a href="#contactus" className="text-indigo-600 font-bold no-underline hover:underline"> Contact us now.</a></p>          

            </div>
            <img src={bcc_dev} className="max-w-sm rounded-lg" />
        </div>
    </div>
    );
};

export default Section2;

