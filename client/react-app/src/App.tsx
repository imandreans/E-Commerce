import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import ShopPage from "./pages/shop";
import PurchasedItemsPage from "./pages/purchase-items";
import CheckOutPage from "./pages/checkout";
import AuthPage from "./pages/auth/index";
import { ShopContextProvider } from "./context/shop-context";
import Register from "./pages/auth/register";
function App() {
  return (
    <>
      {/* make a routing */}
      <BrowserRouter>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<ShopPage />} // route to shop page
            />
            <Route
              path="/login"
              element={<AuthPage />} // route to auth page
            />
            <Route
              path="/register"
              element={<Register />} // route to auth page
            />
            <Route
              path="/checkout"
              element={<CheckOutPage />} // route to checkout page
            />
            <Route
              path="/purchased-items"
              element={<PurchasedItemsPage />} // route to purchaseditems page
            />
          </Routes>
        </ShopContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
