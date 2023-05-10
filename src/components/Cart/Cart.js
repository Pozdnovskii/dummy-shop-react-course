import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const items = useSelector(state => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map(item => (
          <CartItem
            key={item.title}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            total={item.price * item.quantity}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
