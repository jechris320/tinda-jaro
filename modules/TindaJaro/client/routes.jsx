import App from './App';
import HomeUI from './components/containers/HomeUI';
import ProductUI from './components/containers/ProductUI';
import RegisterRedirectPage from './components/containers/RegisterRedirectPage';
import ProductDetailsUI from './components/containers/ProductDetailsUI';
import ProfileUI from './components/containers/ProfileUI';
import CartUI from './components/containers/CartUI';
import WishlistUI from './components/containers/WishlistUI';
import CustomerOrderUI from './components/containers/CustomerOrderUI';
import InventoryUI from './components/containers/InventoryUI';
import SalesReportUI from './components/containers/SalesReportUI';
import StockItemUI from './components/containers/StockItemUI';
import PackagerUI from './components/containers/PackagerUI';
import DeliveryPersonnelUI from './components/containers/DeliveryPersonnelUI';

export default {
  path: '/',
  component: App,
  indexRoute: { component: HomeUI },
  childRoutes: [
  		{ path: 'products', component: ProductUI },
  		{ path: 'registered', component: RegisterRedirectPage },
  		{ path: "/product/:productName/:productId", component: ProductDetailsUI},
  		{ path: "profile", component: ProfileUI},
  		{ path: "cart", component: CartUI},
  		{ path: "wishlist", component: WishlistUI},
  		{ path: "orders", component: CustomerOrderUI},
      { path: "inventory", component: InventoryUI},
      { path: "sales-report", component: SalesReportUI},
      { path: "/:productName/:productId", component: StockItemUI},
      { path: "pending-orders", component: PackagerUI},
      { path: "undelivered-orders", component: DeliveryPersonnelUI}
  		]
};
