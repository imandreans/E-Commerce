import { Link } from "react-router-dom";
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
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
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
