import ContactAddress from './ContactAddress'
import ContactForm from './ContactForm'

const Section3 = () => {
    return (
    <div id="contactus" className="hero  text-zinc-950 scroll-my-24 ">{/* border-4 border-indigo-600 */}
        <div className="hero-content flex-col lg:flex-row py-14  px-10">
            <div className="grid gap-52 lg:grid-cols-2 grid-cols-1">
                <ContactForm/>
                <ContactAddress />
            </div>
        </div>
    </div>
    );
};

export default Section3;
