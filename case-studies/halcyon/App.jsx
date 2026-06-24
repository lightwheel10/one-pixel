import { Loader } from '../../src/Loader.jsx';
import { TopBar, Nav, Hero, Marquee, FeaturedEstate, Interlude, PropertiesIndex } from './home.jsx';
import { History, Family, Testimonials, Contact, Office, Footer } from './deep.jsx';

export default function App() {
  return (
    <>
      <Loader duration={2500} mark="OnePixel · Case Study" />
      <TopBar />
      <Nav />
      <Hero />
      <Marquee />
      <FeaturedEstate />
      <Interlude />
      <PropertiesIndex />
      <History />
      <Family />
      <Testimonials />
      <Contact />
      <Office />
      <Footer />
    </>
  );
}
