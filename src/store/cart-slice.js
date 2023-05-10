import { createSlice } from "@reduxjs/toolkit";
// import { uiActions } from "./ui-slice"; //for 2nd variant

const initialCartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items
      state.totalQuantity = action.payload.totalQuantity
    },
    addItem(state, action) {
      state.totalQuantity++;
      state.changed = true;
      const addedAlreadyItem = state.items.find(item => item.title === action.payload.title);

      if (addedAlreadyItem) {
        addedAlreadyItem.quantity++
      }
      if (!addedAlreadyItem) {
        state.items = [...state.items, action.payload];
      }
    },
    removeItem(state, action) {
      state.totalQuantity--;
      state.changed = true;
      const addedAlreadyItem = state.items.find(item => item.title === action.payload.title);

      if (addedAlreadyItem.quantity === 1) {
        state.items = state.items.filter(item => item.title !== action.payload.title)
      } else {
        addedAlreadyItem.quantity--;
      }
    },
  }
});


//second varioant of sending data
// export const sendCartData = (items) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: 'pending',
//         title: 'Sending...',
//         message: 'Sending cart data',
//       })
//     );

//     const sendRequest = async () => {
//       const response = await fetch('https://nepozdno-react-movies-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json',
//         {
//           method: 'PUT',
//           body: JSON.stringify(items),
//         });

//       if (!response.ok) {
//         throw new Error('Sending cart data failed');
//       }
//       // const data = response.json();
//     };

//     try {
//       await sendRequest();
//       dispatch(
//         uiActions.showNotification({
//           status: 'success',
//           title: 'Success',
//           message: 'Sent cart data successfully',
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error',
//           message: 'Sending cart data failed',
//         })
//       );
//     }
//   };
// };
//

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;