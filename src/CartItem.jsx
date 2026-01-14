import React, { useState, useEffect } from 'react';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  // Calculate total for this specific item
  const calculateItemTotal = () => {
    return item.price * quantity;
  };
  
  // Handle increment button click
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };
  
  // Handle decrement button click
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onUpdateQuantity) {
        onUpdateQuantity(item.id, newQuantity);
      }
    }
  };
  
  // Handle remove button click
  const handleRemove = () => {
    if (onRemoveItem) {
      onRemoveItem(item.id);
    }
  };
  
  // Calculate total cart amount (for display in this component)
  const calculateTotalAmount = () => {
    return calculateItemTotal();
  };
  
  // Update quantity if prop changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="cart-item" data-testid="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <p className="item-price">Price: ${item.price.toFixed(2)}</p>
        
        <div className="quantity-controls">
          <button 
            className="quantity-btn decrement" 
            onClick={handleDecrement}
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={quantity <= 1}
          >
            -
          </button>
          
          <span className="quantity-display" data-testid="item-quantity">
            {quantity}
          </span>
          
          <button 
            className="quantity-btn increment" 
            onClick={handleIncrement}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
          
          <button 
            className="remove-btn" 
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
      
      <div className="item-total">
        <p className="total-label">Item Total:</p>
        <p className="total-amount" data-testid="item-total">
          ${calculateTotalAmount().toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
