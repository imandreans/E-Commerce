import { useContext } from "react";
import { IProduct } from "../../models/interface";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
// import { height } from "@fortawesome/free-solid-svg-icons/fa0";
interface props {
  product: IProduct;
}

// function to show product individually
const Product = (props: props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } = props.product;
  const { addToCart, getCartItemCount, isAuthenticated, removeFromCart } = useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(_id);

  console.log(count);

  return (
    <Card sx={{ width: 210, maxHeight: 300 }}>
      <CardMedia
        component={"img"}
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
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {isAuthenticated && (
          <>
            <Button
              variant="contained"
              className="add-to-cart-btn"
              onClick={() => addToCart(_id)}
              disabled={stockQuantity === 0}
            >
              {/* Add to Cart {count > 0 && <>({count})</>} */}
              {stockQuantity === 0 ? (
                "Stock is empty"
              ) : (
                <>
                  <AddIcon /> {count > 0 && `(${count})`}
                </>
              )}
            </Button>
            {count > 0 && (
              <Button
                variant="outlined"
                onClick={() => removeFromCart(_id)}
                // sx={{ borderColor: "#f14040" }}
                color="error"
              >
                <DeleteIcon />
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
