import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./product";
import CarouselImage from "../../components/carouselPage";

const ShopPage = () => {
  const { products } = useGetProducts();
  const linkImage = "https://drive.google.com/thumbnail?id=";
  const imgs = [linkImage + "11pLdf6hjMG3LGR0gSqXrLnGApBf8fucT&sz=w1400", linkImage + "11gxAHtiylCsLs9-7UUrNHMZCDtwNFh_U&sz=w1400", linkImage + "11kj7wMm849mrFNAFdh9IkkFIFVOX1p8q&sz=w1400"];

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
            src="https://drive.google.com/thumbnail?id=11Qez9QgIOzgB1B5i1Q3XxPQiDh33fQ9f&sz=w250"
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
            src="https://drive.google.com/thumbnail?id=11Qez9QgIOzgB1B5i1Q3XxPQiDh33fQ9f&sz=w250"
            alt=""
          />
        </aside>
      </main>
    </>
  );
};

export default ShopPage;
