import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://nepozdno-react-movies-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(
        {
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        }
      ))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Fetching cart data failed',
        })
      );
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch('https://nepozdno-react-movies-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(
            {
              items: cart.items,
              totalQuantity: cart.totalQuantity,
            }
          ),
        });

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
      // const data = response.json();
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sent cart data successfully',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed',
        })
      );
    }
  };
};