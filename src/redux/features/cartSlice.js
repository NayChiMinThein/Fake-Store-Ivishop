import { createSlice } from "@reduxjs/toolkit"

const getCartFromSession = () => {
    const getCart = sessionStorage.getItem("cart")
    if(getCart){
        return JSON.parse(getCart)
    } else {
        const emptyCart = []
        sessionStorage.setItem("cart", JSON.stringify(emptyCart))
        return emptyCart
    }
}

const initialState = {
    cart: getCartFromSession(),
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = state.cart ? [...state.cart, action.payload] : [action.payload]

            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        },

        addCartQty: (state, action) => {
            const item = state.cart.find(c => c.id === action.payload.id)
            if(item.quantity >= 1){
                state.cart = state.cart.map(c => c.id === action.payload.id ? 
                    {...c, quantity: item.quantity += 1} : c)
            }

            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        },

        reduceCartQty: (state, action) => {
            const item = state.cart.find(c => c.id === action.payload.id)
            if(item.quantity > 1){
                state.cart = state.cart.map(c => c.id === action.payload.id ? 
                    {...c, quantity: item.quantity -= 1} : c)
            }

            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        },

        removeCartProduct: (state, action) => {
            const item = state.cart.find(c => c.id === action.payload.id)
            if(item){
                state.cart = state.cart.filter(c => c.id !== action.payload.id)
            }
            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        },

        orderSuccess: (state) => {
            state.cart = []
            sessionStorage.setItem("cart", JSON.stringify(state.cart))
        }
    }
})

export default cartSlice.reducer
export const {addToCart, addCartQty, reduceCartQty, removeCartProduct, orderSuccess} = cartSlice.actions