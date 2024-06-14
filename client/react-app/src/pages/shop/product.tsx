import { useContext } from "react";
import { IProduct } from "../../models/interface";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import { height } from "@fortawesome/free-solid-svg-icons/fa0";
interface props {
  product: IProduct;
}

// function to show product individually
const Product = (props: props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } = props.product;
  const { addToCart, getCartItemCount, isAuthenticated } = useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(_id);

  console.log(count);
  return (
    <Card sx={{ width: 210, maxHeight: 300 }}>
      <CardMedia
        sx={{ height: 150 }}
        image={imageURL}
      />
      <CardContent>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={8}
          >
            <Typography variant="h6">{productName}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
          >
            <Typography variant="body1">${price}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {isAuthenticated && (
          <>
            <Button
              variant="contained"
              className="add-to-cart-btn"
              onClick={() => addToCart(_id)}
              disabled={stockQuantity === 0}
            >
              {/* Add to Cart {count > 0 && <>({count})</>} */}
              {stockQuantity === 0 ? "Stock empty" : <>Add to Cart {count > 0 && `(${count})`}</>}
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
