import { Loader } from '../../src/Loader.jsx';
import { CartProvider, useRoute } from './store.jsx';
import { Header, Footer, MiniCart } from './ui.jsx';
import { Home, Shop, Product, Story, About, Contact, Checkout } from './pages.jsx';

function Routes() {
  const { parts } = useRoute();
  const [seg0, seg1] = parts;

  let page;
  switch (seg0) {
    case undefined: page = <Home />; break;
    case 'shop': page = <Shop category={seg1} />; break;
    case 'product': page = <Product id={seg1} />; break;
    case 'story': page = <Story />; break;
    case 'about': page = <About />; break;
    case 'contact': page = <Contact />; break;
    case 'checkout': page = <Checkout />; break;
    default: page = <Home />;
  }
  return <main id="top">{page}</main>;
}

export default function App() {
  return (
    <CartProvider>
      <Loader duration={2500} mark="Forest & Loom" />
      <Header />
      <Routes />
      <Footer />
      <MiniCart />
    </CartProvider>
  );
}
