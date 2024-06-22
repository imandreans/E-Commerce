import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./styles.css";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount, removeFromCart } = useContext<IShopContext>(ShopContext);

  return (
    <>
      <div className="purchased-items-page">
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item._id);
          return (
            <Card sx={{ width: 300, maxHeight: 270 }}>
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
                {count > 0 && (
                  <Button
                    variant="outlined"
                    onClick={() => removeFromCart(item._id)}
                    // sx={{ borderColor: "#f14040" }}
                    color="error"
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default PurchasedItemsPage;
