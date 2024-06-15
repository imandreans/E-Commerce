import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useContext } from "react";
export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const logout = () => {
    // when log out, set auth false
    setIsAuthenticated(false);
  };
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-title">
          <h2>Toko</h2>
        </div>
      </Link>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/purchased-items"
              // ="current"
              className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
            >
              Purchases
            </NavLink>
            <NavLink
              to="/checkout"
              className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>
            {/* <Link to="/auth"></Link> */}
            <Link
              to="/"
              onClick={logout}
            >
              Logout
            </Link>
            {/* display money */}
            <span>${availableMoney.toFixed(2)}</span>
          </>
        ) : (
          <Link to="/login">Login to Purchase</Link>
        )}
      </div>
    </div>
  );
};
