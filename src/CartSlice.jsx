// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increment quantity if already exists
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Item already in cart, increase quantity
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // New item, add to cart
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
      
      // Update cart totals
      state.totalQuantity += newItem.quantity || 1;
      state.totalAmount += newItem.price * (newItem.quantity || 1);
      
      // Save to localStorage for persistence (optional)
      localStorage.setItem('cart', JSON.stringify(state));
    },

    // Remove item completely from cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        
        // Update totals before removing
        state.totalQuantity -= removedItem.quantity;
        state.totalAmount -= removedItem.price * removedItem.quantity;
        
        // Remove item from array
        state.items.splice(itemIndex, 1);
      }
      
      // Save to localStorage for persistence (optional)
      localStorage.setItem('cart', JSON.stringify(state));
    },

    // Update quantity of specific item in cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        const oldQuantity = item.quantity;
        const quantityDifference = quantity - oldQuantity;
        
        // Update item quantity
        item.quantity = quantity;
        
        // Update cart totals based on quantity change
        state.totalQuantity += quantityDifference;
        state.totalAmount += quantityDifference * item.price;
        
        // If quantity becomes 0 or negative, remove the item
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }
      
      // Save to localStorage for persistence (optional)
      localStorage.setItem('cart', JSON.stringify(state));
    },

    // Optional: Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Clear from localStorage (optional)
      localStorage.removeItem('cart');
    },

    // Optional: Load cart from localStorage
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        state.items = parsedCart.items || [];
        state.totalQuantity = parsedCart.totalQuantity || 0;
        state.totalAmount = parsedCart.totalAmount || 0;
      }
    },
  },
});

// Export actions
export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  loadCartFromStorage 
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selectors for accessing cart data
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectItemQuantity = (id) => (state) => 
  state.cart.items.find(item => item.id === id)?.quantity || 0;
