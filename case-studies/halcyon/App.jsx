import CustomCursor from './CustomCursor.jsx';
import { TopBar, Nav, Hero, Marquee, FeaturedEstate, PropertiesIndex } from './home.jsx';
import { HudsonMap, Family, Journal, Contact, Footer } from './deep.jsx';

export default function App() {
  return (
    <>
      <CustomCursor />
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
      <Footer />
    </>
  );
}
