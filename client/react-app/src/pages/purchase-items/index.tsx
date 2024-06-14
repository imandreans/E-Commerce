import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./styles.css";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

  return (
    <>
      <Typography variant="h3">Previously Purchased</Typography>
      <div className="purchased-items-page">
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item._id);
          return (
            <Card sx={{ width: 200, maxHeight: 270 }}>
              <CardMedia
                sx={{ height: 150 }}
                image={item.imageURL}
              />
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6">{item.productName}</Typography>
                <Typography variant="subtitle1">${item.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item._id)}
                  disabled={item.stockQuantity === 0}
                >
                  {/* Add to Cart {count > 0 && <>({count})</>} */}
                  {item.stockQuantity === 0 ? "Stock empty" : <>Purchase Again {count > 0 && `(${count})`}</>}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default PurchasedItemsPage;
