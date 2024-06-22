import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
export const Navbar = () => {
  const { availableMoney, isAuthenticated, handleLogout } = useContext<IShopContext>(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="header">
        <Link to="/">
          <h3>Toko</h3>
        </Link>
        <MenuIcon
          fontSize="large"
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        ></MenuIcon>
      </div>

      {isAuthenticated ? (
        <>
          <ul className={menuOpen ? "open" : ""}>
            <li id="purchased-items">
              <NavLink
                to="/purchased-items"
                // ="current"
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                Purchases
              </NavLink>
            </li>
            <li id="checkout">
              <NavLink
                to="/checkout"
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                {menuOpen ? "Checkout" : <FontAwesomeIcon icon={faShoppingCart} />}
              </NavLink>
            </li>
            {/* <Link to="/auth"></Link> */}
            <li id="logout">
              <Link
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
            {/* display money */}
            <li id="available-money">
              <span>${availableMoney.toFixed(2)}</span>
            </li>
          </ul>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
          id="login"
        >
          Login to Purchase
        </NavLink>
      )}
    </div>
  );
};
