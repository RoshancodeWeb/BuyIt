const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    products:[]
};

const Slice=createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        addProducts:(state,action)=>{
            state.products=action.payload;
        }
    }
})

export const {addProducts}=Slice.actions;
export default Slice.reducer;