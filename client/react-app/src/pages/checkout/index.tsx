import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interface";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const CheckOutPage = () => {
  // get the shopcontext functions
  const { getCartItemCount, getTotalCartAmount, checkout } = useContext<IShopContext>(ShopContext);
  //get the products
  const { products } = useGetProducts();
  const navigate = useNavigate();
  // get the total amout of item inside the cart
  const totalAmount = getTotalCartAmount();
  return (
    <div className="cart">
      <div>
        <Typography
          variant="h3"
          style={{ margin: 10 }}
        >
          Your items
        </Typography>
      </div>
      <div className="cart">
        {/* looping the item that is inside the cart */}
        {products.map((product: IProduct) => {
          // if item inside the cart
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} />;
          }
        })}
      </div>
      {/* if there's item inside the cart */}
      {totalAmount > 0 ? (
        <div className="checkout">
          <Typography
            id="subtotal"
            variant="h6"
            component={"div"}
          >
            {" "}
            Subtotal: ${totalAmount.toFixed(2)}
          </Typography>
          <div>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              style={{ color: "black", borderColor: "black", marginRight: 10 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              onClick={() => checkout()}
              style={{ backgroundColor: "black" }}
            >
              Check Out
            </Button>
          </div>
        </div>
      ) : (
        // if there's no item in the cart
        <h1> Your Shopping cart is Empty</h1>
      )}
    </div>
  );
};

export default CheckOutPage;
