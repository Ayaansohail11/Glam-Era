import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import NewCollectionPage from "./pages/NewCollectionPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import WishlistPage from "./pages/WishlistPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "collections", Component: CollectionsPage },
      { path: "new-collection", Component: NewCollectionPage },
      { path: "product/:id", Component: ProductPage },
      { path: "cart", Component: CartPage },
      { path: "payment", Component: PaymentPage },
      { path: "orders", Component: OrdersPage },
      { path: "order-history", Component: OrderHistoryPage },
      { path: "wishlist", Component: WishlistPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
