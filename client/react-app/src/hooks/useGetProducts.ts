import axios from "axios";
import { useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";
// fetch product from database
export const useGetProducts = () => {
  //use state, Interface product type
  const [products, setProducts] = useState<IProduct[]>([]);
  // get headers from useGetToken
  const { headers } = useGetToken();
  // const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  // fetch product
  const fetchProducts = async () => {
    try {
      //get products and send headers of token to get verify / get access
      const fetchedProducts = await axios.get("https://e-commerce-sand-one.vercel.app/product", { headers });
      //product is store in products by using setProducts
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      alert("ERROR: Something went wrong. Cookies maybe");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //return stored products
  return { products };
};
