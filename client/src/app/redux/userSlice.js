const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userType: typeof window !== "undefined" ? localStorage.getItem("userType") || "" : ""
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("userType", action.payload);
      }
      state.userType = action.payload;
    }
  }
});

export const { setUserType } = userSlice.actions;
export default userSlice.reducer;
