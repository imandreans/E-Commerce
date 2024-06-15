import { bcrypt } from "bcryptjs";
import { Router, Request, Response, NextFunction } from "express";
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";
import jwt from "jsonwebtoken";
import { availableMemory } from "process";

const router = Router();

//send new acc w/ username & password to mongoDB
router.post("/register", async (req: Request, res: Response) => {
  //receives input
  const { username, password } = req.body;

  try {
    //find existed user
    const user = await UserModel.findOne({ username: username });

    if (user) {
      // if user already exist
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXIST });
    }
    //if no, create new user
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User Registered Succesfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

//send input to log in
router.post("/login", async (req: Request, res: Response) => {
  // receives input
  const { username, password } = req.body;
  try {
    //find existed user
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      //if user not exist
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    //if exist
    // compare input password with user password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      //if passwords not same
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    //create and send token to create the user.
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});
// verify wheter token is correct to access certain url
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  //get header that contains the token
  const authHeader = req.headers.authorization;
  // if the token is not exist
  if (authHeader) {
    //verify token
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      // proceed to the next middleware function
      next();
    });
  } else {
    //send error
    res.sendStatus(401);
  }
};

//route to get user money
router.get("/available-money/:userID", verifyToken, async (req: Request, res: Response) => {
  // get input id from localStorage
  const { userID } = req.params;
  try {
    // find user
    const user = await UserModel.findById(userID);

    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    // response/send the money to be fetched
    res.json({ availableMoney: user.availableMoney });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export { router as userRouter };
