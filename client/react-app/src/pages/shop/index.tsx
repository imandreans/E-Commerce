import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./product";
const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <>
      <main>
        {/* looping product */}
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </main>
    </>
  );
};

export default ShopPage;
