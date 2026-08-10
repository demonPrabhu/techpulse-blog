import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice.js'

/** Redux store; currently holds just the auth slice. */
const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store