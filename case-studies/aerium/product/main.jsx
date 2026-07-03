import { createRoot } from 'react-dom/client';
import '../styles.css';
import ProductApp from './ProductApp.jsx';

createRoot(document.getElementById('aerium-product-root')).render(<ProductApp />);
