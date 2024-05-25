
import Navbar from '../../components/Navbar'
// import Background from '../../components/Background'
import HeroSection from '../../components/HeroSection'
import Section1 from '../../components/Section1'
import Section2 from '../../components/Section2'
import Section3 from '../../components/Section3'
import Footer from '../../components/Footer'

const Landing=()=>{

  return (
      <div className="w-auto">
        <Navbar />
        <HeroSection/>
        <div className=' py-1'></div>{/* className='bg-sky-100 py-5' */}
        <Section1 />
        <div className=' py-1'></div>{/* className='bg-sky-100 py-5' */}
        <Section2 />
        <div className=' py-1'></div>{/* className='bg-sky-100 py-5' */}
        <Section3 />
        <div className=' py-10'></div>{/* className='bg-sky-100 py-5' */}
        <Footer/>
        <div className=' py-6'></div>{/* className='bg-sky-100 py-5' */}
      </div>
      )
}

export default Landing;
