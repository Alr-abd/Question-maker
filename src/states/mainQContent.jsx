import { createSlice } from "@reduxjs/toolkit";

const mainQuestionsSlice = createSlice({
  name: "MainQContent",
  initialState: [],
  reducers: {
    saveContent: (state, action) => {
      state.push(action.payload)
    },
    removeContent: (state, action) => state.filter((content) => content.id !== action.payload)
  },
});

export const {saveContent, removeContent} =  mainQuestionsSlice.actions
export default mainQuestionsSlice.reducer;