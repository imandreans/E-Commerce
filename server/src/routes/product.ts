import { Router, Request, Response } from "express";
import { ProductModel } from "../models/product";
import { verifyToken } from "./user";
import { UserModel } from "../models/user";
import { ProductErrors, UserErrors } from "../errors";

const router = Router();
//routing to get all the product
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
});
//routing to checkout items
router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  // The input to checkout items
  const { customerID, cartItems } = req.body;

  try {
    //find user by id
    const user = await UserModel.findById(customerID);
    //obtain items that user want and store it to array
    const productIDs = Object.keys(cartItems);
    // find product by id
    const products = await ProductModel.find({ _id: { $in: productIDs } });
    //If user doesn't exist
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    //if products not found
    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }
    // total price in carts
    let totalPrice = 0;
    let numOfItems = 0;
    // loop item inside carts
    for (const item in cartItems) {
      // product
      const product = products.find((product) => String(product._id) === item);
      // if there's no product
      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }
      // if num of product is lower than num of product in carts
      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }
      // sum the price of items in cart
      totalPrice += product.price * cartItems[item];
      numOfItems = cartItems[item];
    }
    // if user money is lower than total price
    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }
    // user money subtracts by the total price
    user.availableMoney -= totalPrice;
    // push purchased items to purchasedItems
    user.purchasedItems.push(...productIDs);
    // changes in user database is saved
    await user.save();
    // update product quantity
    await ProductModel.updateMany({ _id: { $in: productIDs } }, { $inc: { stockQuantity: -numOfItems } });

    //make purchasedItems attributes in user collection
    res.json({ purchasedItems: user.purchasedItems });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/purchased-items/:customerID", verifyToken, async (req: Request, res: Response) => {
  const { customerID } = req.params;
  try {
    // find user
    const user = await UserModel.findById(customerID);

    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    // find purchased products
    const products = await ProductModel.find({ _id: { $in: user.purchasedItems } });

    // response/send the money to be fetched
    res.json({ purchasedItems: products });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export { router as productRouter };
