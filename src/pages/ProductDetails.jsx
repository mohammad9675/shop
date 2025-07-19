import ProductDetailsComponent from "../components/productDetails/ProductDetails.jsx";
import TopBar from "../components/TopBar.jsx";
import MainNav from "../components/MainNav.jsx";

export default function ProductDetails() {
  return (
    <>
      <TopBar />
      <MainNav />
      <ProductDetailsComponent />
    </>
  );
}
