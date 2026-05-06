import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice.js'

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store

// 11blogapp\src\featues\authSlice.js

// 11blogapp\src\store\store.js