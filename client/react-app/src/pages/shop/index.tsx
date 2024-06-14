import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./product";
const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <div className="shop">
      <div className="products">
        {/* looping product */}
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
