import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';

import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(cartActions.addItem({title: props.title, price: props.price, quantity: 1}))
  };

  const removeHandler = () => {
    dispatch(cartActions.removeItem({title: props.title, price: props.price, quantity: 1}))
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.title}</h3>
        <div className={classes.price}>
          ${props.total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${props.price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
