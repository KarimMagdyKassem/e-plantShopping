import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // حساب مجموع كل المنتجات
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.cost.substring(1));
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    // حساب المجموع الفرعي لكل منتج
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    // استكمال التسوق
    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    // زيادة الكمية
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    // تقليل الكمية
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // إزالة المنتج من الكارت
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // تنبيه عند الدفع (غير مطور بعد)
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => handleDecrement(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <p>Unit Price: {item.cost}</p>
                                <p>Subtotal: ${calculateTotalCost(item)}</p>
                                <button onClick={() => handleRemove(item)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ${calculateTotalAmount()}</h3>
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                    <button onClick={handleCheckoutShopping}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartItem;



