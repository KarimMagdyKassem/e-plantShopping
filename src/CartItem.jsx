import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={onContinueShopping}>Continue Shopping</button>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h4>{item.name}</h4>
          <p>Price: {item.cost}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => handleRemove(item)}>Remove</button>
          <p>Subtotal: ${parseFloat(item.cost.substring(1)) * item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${calculateTotalAmount()}</h3>
    </div>
  );
}

export default CartItem;




