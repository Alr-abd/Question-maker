import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
  returned: []
}]

const currentQContentSlice = createSlice({
  name: "CurrentContent",
  initialState,
  reducers: {
    addCurrentContent: (state, action) => state.concat(action.payload),
    clearCurrentContent: () => initialState
  },
});

export const { addCurrentContent, clearCurrentContent } = currentQContentSlice.actions
export default currentQContentSlice.reducer;