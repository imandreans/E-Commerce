import { useContext } from "react";
import { IProduct } from "../../models/interface";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";

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
    <Card sx={{ height: 150, width: 650, marginBottom: 2 }}>
      <Grid
        container
        spacing={1}
        // justifyContent={"space-around"}
      >
        <Grid
          item
          xs={3}
        >
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }}
            image={imageURL}
          />
        </Grid>
        <Grid
          item
          alignSelf={"center"}
          xs={4}
        >
          <CardContent>
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
        </Grid>
        <Grid
          item
          alignSelf={"center"}
          xs={5}
          display={"flex"}
        >
          <CardActions>
            <Button
              sx={{ width: 56, height: 56, borderColor: "#073B4C", color: "#073B4C" }}
              id="reduce-button"
              variant="outlined"
              onClick={() => removeFromCart(_id)}
            >
              {" "}
              -{" "}
            </Button>
            <TextField
              sx={{ width: 56, height: 56 }}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              type="tel"
              value={cartItemCount}
              // update the value by the input
              onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
            />
            {/* add item and amount of it by one */}
            <Button
              sx={{ width: 56, height: 56, backgroundColor: "#073B4C" }}
              variant="contained"
              onClick={() => addToCart(_id)}
            >
              {" "}
              +{" "}
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
