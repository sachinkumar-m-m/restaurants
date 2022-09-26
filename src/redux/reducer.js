import { createSlice  } from '@reduxjs/toolkit'

export const state = createSlice({
  name: 'counter',
  initialState: {
    user: null,
    cartList:[],
    modal:false
  },
  reducers: {
    setUser: (state, action)=>{
        state.user = action.payload
    },
    cart:(state, action)=>{
        state.cartList = action.payload;
    },
    setModal:(state,action)=>{
        state.modal = action.payload;
    }
  }
})

export const { setUser, cart, setModal } = state.actions;
export default state.reducer;