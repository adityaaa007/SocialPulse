import { configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import databaseReducer from '../features/database/databaseSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    database: databaseReducer
  }
})

export default store;