const HeroSection = () => {
    return (
    <div className="hero  text-zinc-950">{/* border-4 border-indigo-600 */}
        <div className="hero-content flex-col lg:flex-row bg-white-500 py-14 px-10 ">
            <div className="bg-white-500">
                <h1 className="text-4xl xs:text-5xl leading-tight font-bold">Expert Guidance, Successful Outcomes!</h1>
                <p className="text-2xl py-3">We promise expert guidance through our consultants and continual enhancement.</p>

                <p className="text-xl py-3">Whether you&apos;re a savvy client or a budding developer, our platform bridges the gap 
                between talent and opportunity. With user-friendly interfaces and simplified processes, 
                navigating our platform is a breeze for everyone.</p>  

                <p className="text-xl py-3">We understand the importance of clear communication and transparency in our interactions. 
                That&apos;s why we strive to make complex technical concepts easy to grasp for everyone, ensuring that both clients and 
                freshers feel empowered and informed every step of the way. At our core, we believe in democratizing access to technology 
                and fostering a culture of inclusivity and diversity. </p>          

            </div>
        </div>
    </div>
    );
};

export default HeroSection;
