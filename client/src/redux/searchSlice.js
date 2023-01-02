import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destination: undefined,
  date: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    newSearch: (state, action) => {
      state.destination = action.payload.destination;
      state.date = action.payload.date;
      state.options = action.payload.options;
    },
    resetSearch: (state) => {
      state.destination = undefined;
      state.date = [];
      state.options = {
        adult: undefined,
        children: undefined,
        room: undefined,
      };
    },
  },
});

export const { newSearch, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
