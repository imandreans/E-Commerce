import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./product";
import CarouselImage from "../../components/carouselPage";

const ShopPage = () => {
  const { products } = useGetProducts();
  const imgs = ["../public/Jumbotron (ANIME).png", "../public/Jumbotron (GAMING).png", "../public/Jumbotron (HOUSEHOLD).png"];

  return (
    <>
      <CarouselImage>
        {imgs.map((i) => (
          <img src={i} />
        ))}
      </CarouselImage>

      <main>
        <aside>
          <img
            src="..\public\Ads 1.png"
            alt=""
          />
        </aside>
        <section>
          {/* looping product */}
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
            />
          ))}
        </section>
        <aside>
          <img
            src="..\public\Ads 1.png"
            alt=""
          />
        </aside>
      </main>
    </>
  );
};

export default ShopPage;
