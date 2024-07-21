// store.js
import { configureStore } from '@reduxjs/toolkit';

import CartSlice from './slice/CartSlice';

const store = configureStore({
  reducer: {
    cart: CartSlice,
  },
});

export default store;
