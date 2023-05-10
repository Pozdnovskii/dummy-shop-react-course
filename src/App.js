import { Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { uiActions } from './store/ui-slice'; //for 1st variant of sending data
import { fetchCartData, sendCartData } from './store/cart-actions'; //for 2nd variant of sending data

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartShown = useSelector(state => state.ui.isCartShown);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
      dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data',
  //       })
  //     );
  //     const response = await fetch('https://nepozdno-react-movies-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cartItems),
  //       });

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed');
  //     }

  //     // const data = response.json();

  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success',
  //         message: 'Sent cart data successfully',
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error',
  //         message: 'Sending cart data failed',
  //       })
  //     );
  //   })
  // }, [cartItems, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartShown && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
};

export default App;
