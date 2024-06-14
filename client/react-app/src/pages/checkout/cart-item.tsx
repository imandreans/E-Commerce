import { useContext } from "react";
import { IProduct } from "../../models/interface";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from "@mui/material";

interface Props {
  product: IProduct;
}

export const CartItem = (prop: Props) => {
  // get product attributes
  const { _id, imageURL, productName, price } = prop.product;
  // get ShopContext functions
  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } = useContext<IShopContext>(ShopContext);
  // get the item by id
  const cartItemCount = getCartItemCount(_id);
  return (
    <Card sx={{ height: 150, width: 650, marginBottom: 2, display: "grid", gridTemplateColumns: "150px 1fr 1fr" }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150 }}
        image={imageURL}
      />
      <CardContent sx={{ alignSelf: "center" }}>
        <Typography
          component="div"
          variant="h5"
        >
          {productName}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
        >
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ width: 56, height: 56, borderColor: "black", color: "black" }}
          id="reduce-button"
          variant="outlined"
          onClick={() => removeFromCart(_id)}
        >
          {" "}
          -{" "}
        </Button>
        <TextField
          style={{ width: 56, height: 56 }}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          type="tel"
          value={cartItemCount}
          // update the value by the input
          onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
        />
        {/* add item and amount of it by one */}
        <Button
          style={{ width: 56, height: 56, backgroundColor: "black" }}
          variant="contained"
          onClick={() => addToCart(_id)}
        >
          {" "}
          +{" "}
        </Button>
      </CardActions>
    </Card>
  );
};
