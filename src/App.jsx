import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetails.jsx";
import { CartProvider } from "./context/CartContext";
import ReviewBagPage from "./pages/ReviewBagPage.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/review-bag" element={<ReviewBagPage />} />{" "}
          {/* <-- new route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
