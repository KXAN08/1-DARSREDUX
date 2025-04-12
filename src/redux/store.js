import { configureStore, createSlice } from '@reduxjs/toolkit';

// Name slice
const nameSlice = createSlice({
  name: 'name',
  initialState: { name: '' },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Light slice
const lightSlice = createSlice({
  name: 'light',
  initialState: { on: false },
  reducers: {
    turnOn: (state) => { state.on = true; },
    turnOff: (state) => { state.on = false; },
    toggle: (state) => { state.on = !state.on; },
  },
});

export const { setName } = nameSlice.actions;
export const { turnOn, turnOff, toggle } = lightSlice.actions;

export const store = configureStore({
  reducer: {
    name: nameSlice.reducer,
    light: lightSlice.reducer,
  },
});
