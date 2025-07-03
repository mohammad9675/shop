import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import TopBar from "../components/TopBar.jsx";
import MainNav from "../components/MainNav.jsx";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <MainNav />
      <Hero />
      <ProductGrid />
    </>
  );
}
