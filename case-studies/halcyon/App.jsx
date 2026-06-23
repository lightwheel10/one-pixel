import { Loader } from '../../src/Loader.jsx';
import { TopBar, Nav, Hero, Marquee, FeaturedEstate, PropertiesIndex } from './home.jsx';
import { HudsonMap, Family, Journal, Contact, Office, Footer } from './deep.jsx';

export default function App() {
  return (
    <>
      <Loader duration={2500} mark="OnePixel · Case Study" />
      <TopBar />
      <Nav />
      <Hero />
      <Marquee />
      <FeaturedEstate />
      <PropertiesIndex />
      <HudsonMap />
      <Family />
      <Journal />
      <Contact />
      <Office />
      <Footer />
    </>
  );
}
