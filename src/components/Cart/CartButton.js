import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';

import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const quantity = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch();
  
  const toggleCartVisibilityHandler = () => {
    dispatch(uiActions.toggleCartVisibility());
  };

  return (
    <button className={classes.button} onClick={toggleCartVisibilityHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
