import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interface";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProductErrors } from "../models/errors";
//interface for ShopContext
export interface IShopContext {
  //name           parameter      return
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
//default value for each function
const defaultVal: IShopContext = {
  // name           default value
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};

//create ShopContext to pass down value of its function (ShopContextProvider)
//            Name                        type          value
export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  //        read items write items             objectId  num of item
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(cookies.access_token !== null);

  const { products } = useGetProducts();
  const { headers } = useGetToken();

  const navigate = useNavigate();
  console.log("auth " + isAuthenticated);
  console.log("access_token " + cookies.access_token);

  // function to get available money from user
  const fetchAvailableMoney = async () => {
    try {
      // get user's available money
      const res = await axios.get(`https://e-commerce-sand-one.vercel.app/user/available-money/${localStorage.getItem("userID")}`, { headers });
      // set available money to display it later
      setAvailableMoney(res.data.availableMoney);
    } catch (error) {
      alert("ERROR: Something went wrong");
    }
  };
  const fetchPurchasedItems = async () => {
    try {
      // get user's purchased items
      const res = await axios.get(`https://e-commerce-sand-one.vercel.app/product/purchased-items/${localStorage.getItem("userID")}`, { headers });
      // set purchased items to display it later
      setPurchasedItems(res.data.purchasedItems);
    } catch (error) {
      alert("ERROR: Something went wrong");
    }
  };

  //get the amount of items in cart
  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  //add item into the cart
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  //remove item from the cart
  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      return;
    }
    if (cartItems[itemId] == 0) {
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  //update the amount of item inside cart
  const updateCartItemCount = (newAmount: number, itemId) => {
    if (newAmount < 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  //get total amount of item inside the cart
  const getTotalCartAmount = (): number => {
    // if (products.length === 0) return 0;
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find((product) => product._id === item);
        console.log(products);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };
  // checkout the item
  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      await axios.post("https://e-commerce-sand-one.vercel.app/product/checkout", body, { headers });
      // empty carts
      setCartItems({});
      // retrieve user money
      fetchAvailableMoney();
      // retrieve user purchased items
      fetchPurchasedItems();
      //back to
      navigate("/");
    } catch (err) {
      if (err?.response?.data?.type === ProductErrors.NO_AVAILABLE_MONEY) {
        alert("ERROR: Not Enough Money");
      } else {
        alert("ERROR: Something went wrong.");
      }
    }
  };
  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null, { sameSite: "lax" });
    }
    // send value of isAuthenticated
  }, [isAuthenticated]);
  // synchronize a component, triggered when the shopcontext provider is called
  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
    // send value of isAuthenticated
  }, [isAuthenticated]);
  //contains value of its function
  const contextValue: IShopContext = { addToCart, removeFromCart, updateCartItemCount, getCartItemCount, getTotalCartAmount, checkout, availableMoney, purchasedItems, isAuthenticated, setIsAuthenticated };
  // passing the value from its functions
  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
