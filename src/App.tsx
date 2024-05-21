import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartSummary from './components/CartSummary';
import './styles/global.css';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';

const App = () => {
	document.title = 'Ecommerce Shop';
  return (
    <Router>
      <header>
		<NavBar title='Ecommerce'>
			<SearchBar />
		</NavBar>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartSummary />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
